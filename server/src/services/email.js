import nodemailer from 'nodemailer'

let transporter

const getTransporter = () => {
    if (!transporter) {
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        })
    }
    return transporter
}

export const assertEmailDeliveryConfigured = () => {
    const consoleMode = process.env.EMAIL_DELIVERY_MODE === 'console' && process.env.NODE_ENV !== 'production'
    if (consoleMode) return
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        const error = new Error('Email delivery is not configured.')
        error.statusCode = 503
        error.code = 'EMAIL_NOT_CONFIGURED'
        error.expose = true
        throw error
    }
}

export const sendVerificationEmail = async ({ email, name, code }) => {
    assertEmailDeliveryConfigured()
    if (process.env.EMAIL_DELIVERY_MODE === 'console' && process.env.NODE_ENV !== 'production') {
        console.log(`Taskly verification code for ${email}: ${code}`)
        return
    }
    try {
        await getTransporter().sendMail({
            from: `Taskly <${process.env.GMAIL_USER}>`,
            to: email,
            subject: 'Verify your Taskly email',
            html: `<div style="font-family:Arial,sans-serif;line-height:1.6"><h1>Verify your Taskly email</h1><p>Hi ${name},</p><p>Your verification code is:</p><p style="font-size:28px;font-weight:700;letter-spacing:6px">${code}</p><p>This code expires in 10 minutes. If you did not create a Taskly account, you can ignore this email.</p></div>`,
        })
    } catch {
        const error = new Error('We could not send the verification email. Please try again later.')
        error.statusCode = 502
        error.code = 'EMAIL_DELIVERY_FAILED'
        error.expose = true
        throw error
    }
}