import { Zap } from 'lucide-react';
import { z } from 'zod'

export const taskCategorySchema = z.enum([
    "work",
    "personal",
    "study",
    "shopping",
    "health",
    "finance",
])

export const taskPrioritySchema = z.enum([
    "high",
    "medium",
    "low",
])

export const taskTagSchema = z.enum([
    // Context & Environment
    'desk',
    'mobile',
    'errand',
    'home',
    'school',

    // Effort & Energy
    'deep_work',
    'quick_win',
    'waiting',

    // Nature of Work
    'creative',
    'technical',
    'admin',
    'review',

    // Collaboration
    'team',
    'solo'
]);

export const taskTagsSchema = z.array(taskTagSchema).min(1, "A tag is required").max(3, "A maximum of 3 tags are allowed");

export const taskSchema = z.object({
    id: z.uuid(),
    title: z.string().trim().min(1, "Title is required").max(100, 'Task title must be 100 characters or fewer'),
    description: z.string().trim().min(1, "Description cannot be empty").max(500, 'Task description must be 500 characters or fewer'),
    category: taskCategorySchema,
    priority: taskPrioritySchema,
    dueDate: z.iso.date(),
    tags: taskTagsSchema,
    completed: z.boolean().default(false),
    archived: z.boolean().default(false),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
    completedAt: z.iso.datetime().nullable().default(null),
    archivedAt: z.iso.datetime().nullable().default(null),
})

export const taskListSchema = z.array(taskSchema)   