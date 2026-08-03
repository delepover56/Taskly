import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { createTaskSchema, updateTaskSchema } from '../src/validation/taskSchemas.js'

describe('task validation', () => {
    const validTask = {
        title: 'Build Taskly API',
        description: 'Connect task actions to MongoDB.',
        category: 'Work',
        priority: 'High',
        dueDate: '2026-08-03',
        tags: ['Technical', 'Deep_Work'],
    }

    it('accepts a complete task payload', () => {
        const task = createTaskSchema.parse(validTask)
        assert.equal(task.title, validTask.title)
        assert.deepEqual(task.tags, validTask.tags)
    })

    it('rejects unknown categories and too many tags', () => {
        assert.equal(createTaskSchema.safeParse({ ...validTask, category: 'Unknown' }).success, false)
        assert.equal(createTaskSchema.safeParse({ ...validTask, tags: ['Desk', 'Mobile', 'Home', 'Solo'] }).success, false)
    })

    it('accepts state-only updates and rejects empty updates', () => {
        assert.deepEqual(updateTaskSchema.parse({ completed: true }), { completed: true })
        assert.equal(updateTaskSchema.safeParse({}).success, false)
    })
})
