import { create } from 'zustand'
import { taskListSchema, taskSchema } from '@/features/tasks/model/taskSchema'
import { useAuthStore } from '@/features/auth/store/useAuthStore'
import { apiRequest } from '@/lib/api'

const csrfToken = () => useAuthStore.getState().csrfToken

export const useTaskStore = create((set, get) => ({
    tasks: [],
    status: 'idle',
    ownerId: null,
    error: null,

    initialize: async (ownerId) => {
        if (!ownerId || (get().ownerId === ownerId && get().status !== 'idle')) return
        set({ tasks: [], status: 'loading', ownerId, error: null })

        try {
            const result = await apiRequest('/tasks')
            set({ tasks: taskListSchema.parse(result.tasks), status: 'ready', error: null })
        } catch (error) {
            set({ tasks: [], status: 'error', error: error.message })
            throw error
        }
    },

    reset: () => set({ tasks: [], status: 'idle', ownerId: null, error: null }),

    addTask: async (taskData) => {
        const result = await apiRequest('/tasks', {
            method: 'POST',
            csrfToken: csrfToken(),
            body: JSON.stringify(taskData),
        })
        const task = taskSchema.parse(result.task)
        set((state) => ({ tasks: [task, ...state.tasks] }))
        return task
    },

    updateTask: async (taskId, taskData) => {
        const result = await apiRequest(`/tasks/${taskId}`, {
            method: 'PATCH',
            csrfToken: csrfToken(),
            body: JSON.stringify(taskData),
        })
        const updatedTask = taskSchema.parse(result.task)
        set((state) => ({
            tasks: state.tasks.map((task) => task.id === taskId ? updatedTask : task),
        }))
        return updatedTask
    },

    toggleTask: async (taskId) => {
        const task = get().tasks.find((item) => item.id === taskId)
        if (!task) return null
        return get().updateTask(taskId, { completed: !task.completed })
    },

    archiveTask: (taskId) => get().updateTask(taskId, { archived: true }),
    restoreTask: (taskId) => get().updateTask(taskId, { archived: false }),

    deleteTask: async (taskId) => {
        await apiRequest(`/tasks/${taskId}`, {
            method: 'DELETE',
            csrfToken: csrfToken(),
        })
        set((state) => ({ tasks: state.tasks.filter((task) => task.id !== taskId) }))
    },
}))
