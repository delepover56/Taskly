const apiBaseUrl = (import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api').replace(/\/$/, '')

export class ApiError extends Error {
    constructor(message, { status, code, details } = {}) {
        super(message)
        this.name = 'ApiError'
        this.status = status
        this.code = code
        this.details = details
    }
}

export const apiRequest = async (path, { csrfToken, headers, ...options } = {}) => {
    const response = await fetch(`${apiBaseUrl}${path}`, {
        ...options,
        credentials: 'include',
        headers: {
            ...(options.body ? { 'Content-Type': 'application/json' } : {}),
            ...(csrfToken ? { 'x-csrf-token': csrfToken } : {}),
            ...headers,
        },
    })

    const data = response.status === 204 ? null : await response.json().catch(() => null)

    if (!response.ok) {
        throw new ApiError(data?.message ?? 'Taskly could not complete that request.', {
            status: response.status,
            code: data?.code,
            details: data?.details,
        })
    }

    return data
}
