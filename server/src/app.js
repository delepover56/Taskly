import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import healthRouter from './routes/healthRoutes.js'
import { errorHandler } from './middleware/errorHandler.js'
import { notFound } from './middleware/notFound.js'

const app = express()
const allowedOrigins = new Set([
    'http://localhost:5173',
    ...(process.env.CLIENT_ORIGIN ?? '').split(',').map((origin) => origin.trim()).filter(Boolean),
])

app.disable('x-powered-by')
app.use(helmet())
app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.has(origin)) {
            callback(null, true)
            return
        }
        const error = new Error('This origin is not allowed to access the Taskly API.')
        error.statusCode = 403
        callback(error)
    },
    credentials: true,
}))
app.use(express.json({ limit: '1mb' }))

app.get('/', (request, response) => response.json({ service: 'taskly-api', health: '/api/health' }))
app.use('/api/health', healthRouter)
app.use(notFound)
app.use(errorHandler)

export default app
