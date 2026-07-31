import { randomBytes } from 'node:crypto'
import jwt from 'jsonwebtoken'

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000

const getJwtSecret = () => {
    const secret = process.env.JWT_SECRET
    if (!secret || secret.length < 32) {
        const error = new Error('JWT_SECRET must contain at least 32 characters.')
        error.statusCode = 503
        throw error
    }
    return secret
}

export const createSession = (userId) => {
    const csrfToken = randomBytes(32).toString('base64url')
    const token = jwt.sign({ csrf: csrfToken }, getJwtSecret(), {
        subject: userId,
        expiresIn: '7d',
        issuer: 'taskly-api',
        audience: 'taskly-web',
    })
    return { token, csrfToken }
}

export const verifySession = (token) => jwt.verify(token, getJwtSecret(), {
    issuer: 'taskly-api',
    audience: 'taskly-web',
})

export const authCookieOptions = () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: SESSION_DURATION_MS,
    path: '/',
})