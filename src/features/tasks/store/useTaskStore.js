import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { taskSchema } from '@/features/tasks/model/taskSchema'
import { offsetDateKey } from '@/lib/date'

const now = new Date().toISOString()

const previewTasks = [
    {
        id: '878c6930-116e-4807-b692-2272dabb5674',
        title: 'Finalize Q3 product roadmap',
        description: 'Review milestones and align the timeline with design.',
        category: 'Work',
        priority: 'High',
        dueDate: offsetDateKey(0),
        tags: ['Desk', 'Deep_Work'],
        createdAt: now,
        updatedAt: now,
    },
    {
        id: '878c6930-116e-4807-b692-2272dabb5675',
        title: 'Prepare design handoff',
        description: 'Package the dashboard components for engineering.',
        category: 'Work',
        priority: 'High',
        dueDate: offsetDateKey(0),
        tags: ['Technical', 'Team'],
        createdAt: now,
        updatedAt: now,
    },
    {
        id: '2b372135-bf91-4fb6-a7b2-621dbef2598d',
        title: 'Book dentist appointment',
        description: 'Find a morning appointment for next week.',
        category: 'Personal',
        priority: 'Medium',
        dueDate: offsetDateKey(0),
        tags: ['Mobile', 'Quick_Win'],
        createdAt: now,
        updatedAt: now,
    },
    {
        id: '7e6a1c42-9d58-4f21-a3b7-6c90e8d14f52',
        title: 'Morning run',
        description: 'Complete a relaxed 5 km run before work.',
        category: 'Health',
        priority: 'Low',
        dueDate: offsetDateKey(0),
        tags: ['Solo', 'Home'],
        completed: true,
        completedAt: now,
        createdAt: now,
        updatedAt: now,
    },
    {
        id: '9b6a1c42-9d58-4f21-a3b7-6c90e8d14f53',
        title: 'Review TypeScript notes',
        description: 'Finish the sections on generics and utility types.',
        category: 'Study',
        priority: 'Medium',
        dueDate: offsetDateKey(1),
        tags: ['School', 'Deep_Work'],
        createdAt: now,
        updatedAt: now,
    },
    {
        id: 'ab6a1c42-9d58-4f21-a3b7-6c90e8d14f54',
        title: 'Order weekly groceries',
        description: 'Oat milk, avocados, coffee beans, and pasta.',
        category: 'Shopping',
        priority: 'Low',
        dueDate: offsetDateKey(1),
        tags: ['Errand', 'Home'],
        createdAt: now,
        updatedAt: now,
    },
    {
        id: 'bb6a1c42-9d58-4f21-a3b7-6c90e8d14f55',
        title: 'Research competitor onboarding',
        description: 'Collect screenshots and notes from five products.',
        category: 'Work',
        priority: 'Medium',
        dueDate: offsetDateKey(2),
        tags: ['Review', 'Deep_Work'],
        createdAt: now,
        updatedAt: now,
    },
    {
        id: 'cb6a1c42-9d58-4f21-a3b7-6c90e8d14f56',
        title: 'Submit expense report',
        description: 'Upload receipts from the latest client workshop.',
        category: 'Finance',
        priority: 'Medium',
        dueDate: offsetDateKey(-1),
        tags: ['Admin', 'Quick_Win'],
        completed: true,
        completedAt: now,
        createdAt: now,
        updatedAt: now,
    },
    {
        id: 'db6a1c42-9d58-4f21-a3b7-6c90e8d14f57',
        title: 'Write project proposal',
        description: 'Draft a concise scope, timeline, and delivery plan.',
        category: 'Work',
        priority: 'High',
        dueDate: offsetDateKey(3),
        tags: ['Creative', 'Desk'],
        createdAt: now,
        updatedAt: now,
    },
    {
        id: 'eb6a1c42-9d58-4f21-a3b7-6c90e8d14f58',
        title: 'Organize old planning notes',
        description: 'Archive material that is no longer actively needed.',
        category: 'Personal',
        priority: 'Low',
        dueDate: offsetDateKey(-3),
        tags: ['Home', 'Admin'],
        archived: true,
        archivedAt: now,
        createdAt: now,
        updatedAt: now,
    },
].map((task) => taskSchema.parse(task))

export const useTaskStore = create(
    persist(
        (set) => ({
            tasks: previewTasks,

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

            resetTasks: () => set({ tasks: previewTasks }),
        }),
        {
            name: 'taskly-tasks-v2',
        },
    ),
)
