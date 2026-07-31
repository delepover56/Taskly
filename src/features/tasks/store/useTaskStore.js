import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { taskSchema } from '@/features/tasks/model/taskSchema'
import { offsetDateKey } from '@/lib/date'

const now = new Date().toISOString()

const initialTasks = [
    {
        id: '878c6930-116e-4807-b692-2272dabb5674',
        title: 'Create your first Taskly task',
        description: 'Use the New Task button, add a clear title and description, then choose its category, priority, due date, and tags.',
        category: 'Study',
        priority: 'High',
        dueDate: offsetDateKey(0),
        tags: ['Quick_Win', 'Creative'],
        createdAt: now,
        updatedAt: now,
    },
    {
        id: '878c6930-116e-4807-b692-2272dabb5675',
        title: 'Choose your default task settings',
        description: 'Open Workspace settings and select the category and priority Taskly should prefill whenever you create a task.',
        category: 'Personal',
        priority: 'Medium',
        dueDate: offsetDateKey(0),
        tags: ['Admin', 'Quick_Win'],
        createdAt: now,
        updatedAt: now,
    },
    {
        id: '2b372135-bf91-4fb6-a7b2-621dbef2598d',
        title: 'Plan work with Today and Upcoming',
        description: 'Give tasks realistic due dates. Today keeps immediate work focused, while Upcoming shows what is scheduled next.',
        category: 'Study',
        priority: 'Medium',
        dueDate: offsetDateKey(1),
        tags: ['Review', 'Desk'],
        createdAt: now,
        updatedAt: now,
    },
    {
        id: '7e6a1c42-9d58-4f21-a3b7-6c90e8d14f52',
        title: 'Organize tasks with categories and tags',
        description: 'Use categories for broad areas of life and tags for context such as Desk, Deep Work, Mobile, or Quick Win.',
        category: 'Study',
        priority: 'Low',
        dueDate: offsetDateKey(1),
        tags: ['Deep_Work', 'Desk'],
        createdAt: now,
        updatedAt: now,
    },
    {
        id: '9b6a1c42-9d58-4f21-a3b7-6c90e8d14f53',
        title: 'Find tasks with search, filters, and sorting',
        description: 'Search the current list, filter it by category, and sort tasks by due date, priority, creation date, or title.',
        category: 'Study',
        priority: 'Low',
        dueDate: offsetDateKey(2),
        tags: ['Review', 'Quick_Win'],
        createdAt: now,
        updatedAt: now,
    },
    {
        id: 'ab6a1c42-9d58-4f21-a3b7-6c90e8d14f54',
        title: 'Complete this task when you know the basics',
        description: 'Select the checkbox when you feel comfortable creating, organizing, and finding tasks. You can undo completion at any time.',
        category: 'Personal',
        priority: 'Medium',
        dueDate: offsetDateKey(2),
        tags: ['Solo', 'Review'],
        createdAt: now,
        updatedAt: now,
    },
    {
        id: 'bb6a1c42-9d58-4f21-a3b7-6c90e8d14f55',
        title: 'Welcome to your Taskly workspace',
        description: 'This completed example shows where finished work appears and how Taskly records completion progress.',
        category: 'Personal',
        priority: 'Low',
        dueDate: offsetDateKey(0),
        tags: ['Quick_Win'],
        completed: true,
        completedAt: now,
        createdAt: now,
        updatedAt: now,
    },
    {
        id: 'cb6a1c42-9d58-4f21-a3b7-6c90e8d14f56',
        title: 'Archived tasks stay out of active lists',
        description: 'This example lives in Archived. Restore it when it becomes relevant again, or delete it permanently when it is no longer needed.',
        category: 'Personal',
        priority: 'Low',
        dueDate: offsetDateKey(-1),
        tags: ['Admin', 'Review'],
        archived: true,
        archivedAt: now,
        createdAt: now,
        updatedAt: now,
    },
].map((task) => taskSchema.parse(task))

export const useTaskStore = create(
    persist(
        (set) => ({
            tasks: initialTasks,

            addTask: (taskData) => {
                const timestamp = new Date().toISOString()
                const task = taskSchema.parse({
                    ...taskData,
                    id: crypto.randomUUID(),
                    createdAt: timestamp,
                    updatedAt: timestamp,
                })

                set((state) => ({ tasks: [task, ...state.tasks] }))
            },

            updateTask: (taskId, taskData) => {
                set((state) => ({
                    tasks: state.tasks.map((task) => {
                        if (task.id !== taskId) return task

                        return taskSchema.parse({
                            ...task,
                            ...taskData,
                            updatedAt: new Date().toISOString(),
                        })
                    }),
                }))
            },

            toggleTask: (taskId) => {
                const timestamp = new Date().toISOString()

                set((state) => ({
                    tasks: state.tasks.map((task) => (
                        task.id === taskId
                            ? {
                                ...task,
                                completed: !task.completed,
                                completedAt: task.completed ? null : timestamp,
                                updatedAt: timestamp,
                            }
                            : task
                    )),
                }))
            },

            archiveTask: (taskId) => {
                const timestamp = new Date().toISOString()

                set((state) => ({
                    tasks: state.tasks.map((task) => (
                        task.id === taskId
                            ? {
                                ...task,
                                archived: true,
                                archivedAt: timestamp,
                                updatedAt: timestamp,
                            }
                            : task
                    )),
                }))
            },

            restoreTask: (taskId) => {
                set((state) => ({
                    tasks: state.tasks.map((task) => (
                        task.id === taskId
                            ? {
                                ...task,
                                archived: false,
                                archivedAt: null,
                                updatedAt: new Date().toISOString(),
                            }
                            : task
                    )),
                }))
            },

            deleteTask: (taskId) => {
                set((state) => ({
                    tasks: state.tasks.filter((task) => task.id !== taskId),
                }))
            },
        }),
        {
            name: 'taskly-tasks-v2',
        },
    ),
)
