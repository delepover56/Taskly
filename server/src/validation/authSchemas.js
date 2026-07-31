import { z } from 'zod'

const emailSchema = z.string().trim().toLowerCase().pipe(z.email('Enter a valid email address.').max(254))

export const signupSchema = z.object({
    name: z.string().trim().min(2, 'Name must contain at least 2 characters.').max(80),
    username: z.string().trim().toLowerCase().regex(/^[a-z0-9_]{3,20}$/, 'Username must be 3-20 characters using letters, numbers, or underscores.'),
    email: emailSchema,
    password: z.string().min(8, 'Password must contain at least 8 characters.').max(128),
})

export const verifyEmailSchema = z.object({
    email: emailSchema,
    code: z.string().trim().regex(/^\d{6}$/, 'Enter the 6-digit verification code.'),
})

export const resendVerificationSchema = z.object({ email: emailSchema })

export const loginSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, 'Password is required.').max(128),
})

export const parseRequest = (schema, value) => {
    const result = schema.safeParse(value)
    if (result.success) return result.data

    const error = new Error(result.error.issues[0]?.message ?? 'Invalid request data.')
    error.statusCode = 400
    error.code = 'VALIDATION_ERROR'
    error.details = result.error.flatten().fieldErrors
    throw error
}