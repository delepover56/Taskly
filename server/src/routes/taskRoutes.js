import { Router } from 'express'
import Task from '../models/Task.js'
import { authenticate, requireCsrf } from '../middleware/authenticate.js'
import { parseRequest } from '../validation/authSchemas.js'
import { createTaskSchema, updateTaskSchema } from '../validation/taskSchemas.js'
import { createStarterTasks } from '../services/starterTasks.js'

const taskRouter = Router()

taskRouter.use(authenticate)

taskRouter.get('/', async (request, response) => {
    if (!request.auth.user.starterTasksCreated) {
        await createStarterTasks(request.auth.user._id)
        request.auth.user.starterTasksCreated = true
        await request.auth.user.save()
    }

    const tasks = await Task.find({ owner: request.auth.user._id }).sort({ createdAt: -1 })
    response.json({ tasks })
})

taskRouter.post('/', requireCsrf, async (request, response) => {
    const data = parseRequest(createTaskSchema, request.body)
    const task = await Task.create({ ...data, owner: request.auth.user._id })
    response.status(201).json({ task })
})

taskRouter.patch('/:taskId', requireCsrf, async (request, response) => {
    const data = parseRequest(updateTaskSchema, request.body)
    const timestamp = new Date()

    if (data.completed !== undefined) data.completedAt = data.completed ? timestamp : null
    if (data.archived !== undefined) data.archivedAt = data.archived ? timestamp : null

    const task = await Task.findOneAndUpdate(
        { id: request.params.taskId, owner: request.auth.user._id },
        { $set: data },
        { new: true, runValidators: true },
    )

    if (!task) {
        const error = new Error('Task not found.')
        error.statusCode = 404
        throw error
    }

    response.json({ task })
})

taskRouter.delete('/:taskId', requireCsrf, async (request, response) => {
    const task = await Task.findOneAndDelete({ id: request.params.taskId, owner: request.auth.user._id })
    if (!task) {
        const error = new Error('Task not found.')
        error.statusCode = 404
        throw error
    }
    response.status(204).end()
})

export default taskRouter
