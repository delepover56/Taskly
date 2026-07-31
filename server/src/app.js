import 'dotenv/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { connectDatabase } from './config/database.js'
import authRouter from './routes/authRoutes.js'
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
app.use(cookieParser())

app.get('/', (request, response) => response.json({ service: 'taskly-api', health: '/api/health' }))
app.use('/api/health', healthRouter)
app.use('/api/auth', async (request, response, next) => {
    void response
    try {
        await connectDatabase()
        next()
    } catch (error) {
        next(error)
    }
}, authRouter)
app.use(notFound)
app.use(errorHandler)

export default app
