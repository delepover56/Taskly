const resendEndpoint = 'https://api.resend.com/emails'

const formatEmailFrom = (value) => {
    const match = value?.match(/^\s*([^<]+?)\s*<\s*([^>]+)\s*>\s*$/)
    return match ? `${match[1].trim()} <${match[2].trim()}>` : value
}

export const assertEmailDeliveryConfigured = () => {
    const consoleMode = process.env.EMAIL_DELIVERY_MODE === 'console' && process.env.NODE_ENV !== 'production'
    if (consoleMode) return

    if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
        const error = new Error('Email delivery is not configured.')
        error.statusCode = 503
        error.code = 'EMAIL_NOT_CONFIGURED'
        throw error
    }
}

export const sendVerificationEmail = async ({ email, name, code }) => {
    assertEmailDeliveryConfigured()

    if (process.env.EMAIL_DELIVERY_MODE === 'console' && process.env.NODE_ENV !== 'production') {
        console.log(`Taskly verification code for ${email}: ${code}`)
        return
    }

    const response = await fetch(resendEndpoint, {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
            from: formatEmailFrom(process.env.EMAIL_FROM),
            to: [email],
            subject: 'Verify your Taskly email',
            html: `<div style="font-family:Arial,sans-serif;line-height:1.6"><h1>Verify your Taskly email</h1><p>Hi ${name},</p><p>Your verification code is:</p><p style="font-size:28px;font-weight:700;letter-spacing:6px">${code}</p><p>This code expires in 10 minutes. If you did not create a Taskly account, you can ignore this email.</p></div>`,
        }),
    })

    if (!response.ok) {
        const error = new Error('Verification email could not be delivered.')
        error.statusCode = 502
        error.code = 'EMAIL_DELIVERY_FAILED'
        throw error
    }
}