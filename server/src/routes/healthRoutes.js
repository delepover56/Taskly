import { Router } from 'express'
import { connectDatabase, getDatabaseStatus } from '../config/database.js'

const healthRouter = Router()

healthRouter.get('/', async (request, response) => {
    const startedAt = Date.now()
    let database = getDatabaseStatus()

    if (database.configured && database.state !== 'connected') {
        try {
            await connectDatabase()
            database = getDatabaseStatus()
        } catch {
            database = { ...getDatabaseStatus(), error: 'Database connection failed.' }
        }
    }

    const healthy = !database.configured || database.state === 'connected'
    response.status(healthy ? 200 : 503).json({
        status: healthy ? 'ok' : 'degraded',
        service: 'taskly-api',
        environment: process.env.NODE_ENV ?? 'development',
        database,
        responseTimeMs: Date.now() - startedAt,
        timestamp: new Date().toISOString(),
    })
})

export default healthRouter
