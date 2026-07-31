import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { signupSchema } from '../src/validation/authSchemas.js'
import { createVerificationCode, matchesVerificationCode } from '../src/services/verificationCode.js'

describe('authentication foundation', () => {
    it('normalizes valid signup data', () => {
        const result = signupSchema.parse({
            name: '  Taha Khan  ',
            username: '  Taha_824  ',
            email: '  TAHA@example.com  ',
            password: 'secure-password',
        })

        assert.equal(result.name, 'Taha Khan')
        assert.equal(result.username, 'taha_824')
        assert.equal(result.email, 'taha@example.com')
    })

    it('rejects weak passwords and invalid usernames', () => {
        const result = signupSchema.safeParse({
            name: 'Taha Khan',
            username: 'not allowed!',
            email: 'taha@example.com',
            password: 'short',
        })

        assert.equal(result.success, false)
    })

    it('creates expiring six-digit codes and compares only their hashes', () => {
        const verification = createVerificationCode()

        assert.match(verification.code, /^\d{6}$/)
        assert.equal(matchesVerificationCode(verification.code, verification.hash), true)
        assert.equal(matchesVerificationCode('000000', verification.hash), false)
        assert.ok(verification.expiresAt.getTime() > Date.now())
    })
})