export const toDateKey = (date = new Date()) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}

export const offsetDateKey = (offset = 0) => {
    const date = new Date()
    date.setDate(date.getDate() + offset)

    return toDateKey(date)
}

export const formatTaskDate = (dateKey) => {
    return new Intl.DateTimeFormat('en', {
        month: 'short',
        day: 'numeric',
    }).format(new Date(`${dateKey}T12:00:00`))
}

export const formatDateTime = (dateTime) => {
    return new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    }).format(new Date(dateTime))
}
