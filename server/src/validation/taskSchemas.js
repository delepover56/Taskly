import { z } from 'zod'
import { taskCategories, taskPriorities, taskTags } from '../models/Task.js'

const taskFields = {
    title: z.string().trim().min(1, 'Title is required.').max(100, 'Task title must be 100 characters or fewer.'),
    description: z.string().trim().min(1, 'Description is required.').max(500, 'Task description must be 500 characters or fewer.'),
    category: z.enum(taskCategories),
    priority: z.enum(taskPriorities),
    dueDate: z.iso.date(),
    tags: z.array(z.enum(taskTags)).min(1, 'Choose at least one tag.').max(3, 'Choose no more than three tags.'),
}

export const createTaskSchema = z.object(taskFields)

export const updateTaskSchema = z.object({
    ...Object.fromEntries(Object.entries(taskFields).map(([key, schema]) => [key, schema.optional()])),
    completed: z.boolean().optional(),
    archived: z.boolean().optional(),
}).refine((data) => Object.keys(data).length > 0, 'Provide at least one task change.')
