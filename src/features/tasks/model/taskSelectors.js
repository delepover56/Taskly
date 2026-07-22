export const selectNonArchivedTasks = (tasks) => {
    return (
        tasks.filter((tasks) => !tasks.archived)
    )
}

``