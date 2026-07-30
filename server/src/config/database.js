import mongoose from 'mongoose'

const connectionState = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' }
const cache = globalThis.__tasklyMongoConnection ?? { promise: null }
globalThis.__tasklyMongoConnection = cache

export const getDatabaseStatus = () => ({
    configured: Boolean(process.env.MONGODB_URI),
    state: connectionState[mongoose.connection.readyState] ?? 'unknown',
})

export const connectDatabase = async () => {
    const uri = process.env.MONGODB_URI
    if (!uri) throw new Error('MONGODB_URI is not configured.')
    if (mongoose.connection.readyState === 1) return mongoose.connection

    if (!cache.promise) {
        cache.promise = mongoose.connect(uri, { maxPoolSize: 10, serverSelectionTimeoutMS: 5000 })
    }

    try {
        await cache.promise
        return mongoose.connection
    } catch (error) {
        cache.promise = null
        throw error
    }
}
