import bcrypt from 'bcryptjs'
import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import User from '../models/User.js'
import { authenticate, requireCsrf } from '../middleware/authenticate.js'
import { authCookieOptions, createSession } from '../services/authToken.js'
import { deleteAvatar, uploadAvatar } from '../services/avatarStorage.js'
import { assertEmailDeliveryConfigured, sendVerificationEmail } from '../services/email.js'
import { createVerificationCode, matchesVerificationCode } from '../services/verificationCode.js'
import { createStarterTasks } from '../services/starterTasks.js'
import { avatarSchema, loginSchema, parseRequest, resendVerificationSchema, signupSchema, updateProfileSchema, verifyEmailSchema } from '../validation/authSchemas.js'

const authRouter = Router()
const signupLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { error: 'Too many requests', message: 'Please wait before creating another account.' },
})
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    skipSuccessfulRequests: true,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { error: 'Too many requests', message: 'Please wait before trying to log in again.' },
})


authRouter.post('/signup', signupLimiter, async (request, response) => {
    assertEmailDeliveryConfigured()
    const data = parseRequest(signupSchema, request.body)
    const existing = await User.findOne({ $or: [{ email: data.email }, { username: data.username }] })

    if (existing) {
        const error = new Error(existing.email === data.email ? 'An account already uses that email address.' : 'That username is already taken.')
        error.statusCode = 409
        throw error
    }

    const verification = createVerificationCode()
    const user = await User.create({
        name: data.name,
        username: data.username,
        email: data.email,
        passwordHash: await bcrypt.hash(data.password, 12),
        verificationCodeHash: verification.hash,
        verificationExpiresAt: verification.expiresAt,
        verificationLastSentAt: new Date(),
    })

    try {
        await sendVerificationEmail({ email: user.email, name: user.name, code: verification.code })
    } catch (error) {
        await User.deleteOne({ _id: user._id, isEmailVerified: false })
        throw error
    }

    response.status(201).json({ message: 'Account created. Check your email for the verification code.', email: user.email })
})

authRouter.post('/verify-email', async (request, response) => {
    const data = parseRequest(verifyEmailSchema, request.body)
    const user = await User.findOne({ email: data.email }).select('+verificationCodeHash +verificationExpiresAt')

    if (!user || user.isEmailVerified) {
        const error = new Error('The verification code is invalid or expired.')
        error.statusCode = 400
        throw error
    }

    const expired = !user.verificationExpiresAt || user.verificationExpiresAt.getTime() < Date.now()
    if (expired || !matchesVerificationCode(data.code, user.verificationCodeHash)) {
        const error = new Error('The verification code is invalid or expired.')
        error.statusCode = 400
        throw error
    }

    user.isEmailVerified = true
    user.verificationCodeHash = null
    user.verificationExpiresAt = null
    await user.save()
    await createStarterTasks(user._id)
    user.starterTasksCreated = true
    await user.save()

    response.json({ message: 'Email verified. You can now log in.' })
})

authRouter.post('/resend-verification', async (request, response) => {
    const data = parseRequest(resendVerificationSchema, request.body)
    const user = await User.findOne({ email: data.email }).select('+verificationLastSentAt')

    if (!user || user.isEmailVerified) {
        response.json({ message: 'If this account needs verification, a new code has been sent.' })
        return
    }

    const sentRecently = user.verificationLastSentAt && Date.now() - user.verificationLastSentAt.getTime() < 60_000
    if (sentRecently) {
        const error = new Error('Wait one minute before requesting another code.')
        error.statusCode = 429
        throw error
    }

    const verification = createVerificationCode()
    user.verificationCodeHash = verification.hash
    user.verificationExpiresAt = verification.expiresAt
    user.verificationLastSentAt = new Date()
    await user.save()
    await sendVerificationEmail({ email: user.email, name: user.name, code: verification.code })

    response.json({ message: 'If this account needs verification, a new code has been sent.' })
})

authRouter.post('/login', loginLimiter, async (request, response) => {
    const data = parseRequest(loginSchema, request.body)
    const user = await User.findOne({ email: data.email }).select('+passwordHash')
    const passwordMatches = user ? await bcrypt.compare(data.password, user.passwordHash) : false

    if (!user || !passwordMatches) {
        const error = new Error('The email or password is incorrect.')
        error.statusCode = 401
        throw error
    }
    if (!user.isEmailVerified) {
        const error = new Error('Verify your email before logging in.')
        error.statusCode = 403
        error.code = 'EMAIL_NOT_VERIFIED'
        throw error
    }

    const session = createSession(user.id)
    response.cookie('taskly_session', session.token, authCookieOptions())
    response.json({ user: user.toJSON(), csrfToken: session.csrfToken })
})

authRouter.patch('/profile', authenticate, requireCsrf, async (request, response) => {
    const data = parseRequest(updateProfileSchema, request.body)
    const usernameOwner = await User.findOne({
        username: data.username,
        _id: { $ne: request.auth.user._id },
    })

    if (usernameOwner) {
        const error = new Error('That username is already taken.')
        error.statusCode = 409
        throw error
    }

    request.auth.user.name = data.name
    request.auth.user.username = data.username
    await request.auth.user.save()

    response.json({ user: request.auth.user.toJSON() })
})

authRouter.put('/profile/avatar', authenticate, requireCsrf, async (request, response) => {
    const data = parseRequest(avatarSchema, request.body)
    const uploaded = await uploadAvatar({ dataUrl: data.dataUrl, userId: request.auth.user.id })
    const user = await User.findByIdAndUpdate(
        request.auth.user._id,
        { avatarSrc: uploaded.secure_url, avatarPublicId: uploaded.public_id },
        { new: true },
    )
    response.json({ user: user.toJSON() })
})

authRouter.delete('/profile/avatar', authenticate, requireCsrf, async (request, response) => {
    const userWithAvatar = await User.findById(request.auth.user._id).select('+avatarPublicId')
    await deleteAvatar(userWithAvatar.avatarPublicId)
    userWithAvatar.avatarSrc = null
    userWithAvatar.avatarPublicId = null
    await userWithAvatar.save()
    response.json({ user: userWithAvatar.toJSON() })
})

authRouter.get('/me', authenticate, async (request, response) => {
    response.json({ user: request.auth.user.toJSON(), csrfToken: request.auth.csrfToken })
})

authRouter.post('/logout', authenticate, requireCsrf, async (request, response) => {
    response.clearCookie('taskly_session', authCookieOptions())
    response.status(204).end()
})

export default authRouter