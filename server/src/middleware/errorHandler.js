export const errorHandler = (error, request, response, next) => {
    void request
    void next
    const statusCode = error.statusCode ?? 500
    const isProduction = process.env.NODE_ENV === 'production'
    const canExposeMessage = statusCode < 500 || error.expose === true

    response.status(statusCode).json({
        error: statusCode >= 500 ? 'Internal server error' : 'Request failed',
        message: isProduction && !canExposeMessage ? 'The server could not complete this request.' : error.message,
        ...(error.code && { code: error.code }),
        ...(error.details && { details: error.details }),
        ...(!isProduction && { stack: error.stack }),
    })
}
