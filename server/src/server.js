import 'dotenv/config'
import app from './app.js'
import { connectDatabase } from './config/database.js'

const port = Number(process.env.PORT) || 3000

const startServer = async () => {
    if (process.env.MONGODB_URI) {
        await connectDatabase()
        console.log('Connected to MongoDB.')
    } else {
        console.warn('MONGODB_URI is not configured; starting without a database connection.')
    }

    app.listen(port, () => console.log(`Taskly API is running at http://localhost:${port}.`))
}

startServer().catch((error) => {
    console.error('Taskly API failed to start.', error)
    process.exit(1)
})
