export const notFound = (request, response) => {
    response.status(404).json({
        error: 'Not found',
        message: `No API route exists for ${request.method} ${request.originalUrl}.`,
    })
}
