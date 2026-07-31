import User from '../models/User.js'
import { verifySession } from '../services/authToken.js'

export const authenticate = async (request, response, next) => {
    void response
    try {
        const token = request.cookies?.taskly_session
        if (!token) {
            const error = new Error('Authentication is required.')
            error.statusCode = 401
            throw error
        }

        const session = verifySession(token)
        const user = await User.findById(session.sub)
        if (!user) {
            const error = new Error('This session is no longer valid.')
            error.statusCode = 401
            throw error
        }

        request.auth = { user, csrfToken: session.csrf }
        next()
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            error.statusCode = 401
            error.message = 'This session is invalid or expired.'
        }
        next(error)
    }
}

export const requireCsrf = (request, response, next) => {
    void response
    if (!request.auth?.csrfToken || request.get('x-csrf-token') !== request.auth.csrfToken) {
        const error = new Error('The request could not be verified.')
        error.statusCode = 403
        next(error)
        return
    }
    next()
}