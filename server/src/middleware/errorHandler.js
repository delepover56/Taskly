export const errorHandler = (error, request, response, next) => {
    void request
    void next
    const statusCode = error.statusCode ?? 500
    const isProduction = process.env.NODE_ENV === 'production'

    response.status(statusCode).json({
        error: statusCode >= 500 ? 'Internal server error' : 'Request failed',
        message: isProduction && statusCode >= 500 ? 'The server could not complete this request.' : error.message,
        ...(!isProduction && { stack: error.stack }),
    })
}
