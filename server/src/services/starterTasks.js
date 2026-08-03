import Task from '../models/Task.js'

const toDateKey = (offset) => {
    const date = new Date()
    date.setDate(date.getDate() + offset)
    return date.toISOString().slice(0, 10)
}

export const createStarterTasks = async (owner) => {
    const tasks = [
        {
            title: 'Create your first Taskly task',
            description: 'Use New Task to add a title, description, category, priority, due date, and useful tags.',
            category: 'Study',
            priority: 'High',
            dueDate: toDateKey(0),
            tags: ['Quick_Win', 'Creative'],
        },
        {
            title: 'Plan work with Today and Upcoming',
            description: 'Give tasks realistic due dates. Today keeps immediate work focused while Upcoming shows what comes next.',
            category: 'Study',
            priority: 'Medium',
            dueDate: toDateKey(1),
            tags: ['Review', 'Desk'],
        },
        {
            title: 'Find tasks with search and filters',
            description: 'Search the current list, filter by category, and sort tasks by due date, priority, creation date, or title.',
            category: 'Study',
            priority: 'Low',
            dueDate: toDateKey(2),
            tags: ['Review', 'Quick_Win'],
        },
    ]

    return Task.insertMany(tasks.map((task) => ({ ...task, owner })))
}
