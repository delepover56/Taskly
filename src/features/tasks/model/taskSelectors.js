export const selectNonArchivedTasks = (tasks) => {
    const nonArchivedTasks = tasks.filter((task) => {
        return task.archived === false
    })

    return nonArchivedTasks
}

export const selectTodaysTasks = (tasks, todaysDate) => {
    const nonArchivedTasks = selectNonArchivedTasks(tasks);

    const todaysTasks = nonArchivedTasks.filter((task) => {
        return task.dueDate === todaysDate && task.completed === false
    })
    return todaysTasks
}

export const selectUpcomingTasks = (tasks, dueDate) => {
    const nonArchivedTasks = selectNonArchivedTasks(tasks);

    const upcomingTasks = nonArchivedTasks.filter((task) => {
        return task.dueDate > dueDate && task.completed === false
    })
    return upcomingTasks
}

export const selectHighPriorityTasks = (tasks) => {
    const nonArchivedTasks = selectNonArchivedTasks(tasks);

    const highPriorityTasks = nonArchivedTasks.filter((task) => {
        return task.completed === false && task.priority === "High";
    })
    return highPriorityTasks
}

export const selectMediumPriorityTasks = (tasks) => {
    const nonArchivedTasks = selectNonArchivedTasks(tasks);

    const mediumPriorityTasks = nonArchivedTasks.filter((task) => {
        return task.completed === false && task.priority === "Medium";
    })
    return mediumPriorityTasks
}

export const selectLowPriorityTasks = (tasks) => {
    const nonArchivedTasks = selectNonArchivedTasks(tasks);

    const lowPriorityTasks = nonArchivedTasks.filter((task) => {
        return task.completed === false && task.priority === "Low";
    })
    return lowPriorityTasks
}

export const selectCompletedTasks = (tasks) => {
    const nonArchivedTasks = selectNonArchivedTasks(tasks);

    const completedTasks = nonArchivedTasks.filter((task) => {
        return task.completed === true;
    })
    return completedTasks
}

export const selectArchivedTasks = (tasks) => {

    const archivedTasks = tasks.filter((task) => {
        return task.archived === true;
    })
    return archivedTasks
}