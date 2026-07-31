import { createHash, randomInt, timingSafeEqual } from 'node:crypto'

const CODE_LIFETIME_MS = 10 * 60 * 1000

export const hashVerificationCode = (code) => createHash('sha256').update(code).digest('hex')

export const createVerificationCode = () => {
    const code = randomInt(100000, 1000000).toString()
    return { code, hash: hashVerificationCode(code), expiresAt: new Date(Date.now() + CODE_LIFETIME_MS) }
}

export const matchesVerificationCode = (code, storedHash) => {
    if (!storedHash) return false
    const submitted = Buffer.from(hashVerificationCode(code), 'hex')
    const stored = Buffer.from(storedHash, 'hex')
    return submitted.length === stored.length && timingSafeEqual(submitted, stored)
}