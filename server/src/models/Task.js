import { randomUUID } from 'node:crypto'
import mongoose from 'mongoose'

export const taskCategories = ['Work', 'Personal', 'Study', 'Shopping', 'Health', 'Finance']
export const taskPriorities = ['High', 'Medium', 'Low']
export const taskTags = ['Desk', 'Mobile', 'Errand', 'Home', 'School', 'Deep_Work', 'Quick_Win', 'Waiting', 'Creative', 'Technical', 'Admin', 'Review', 'Team', 'Solo']

const taskSchema = new mongoose.Schema(
    {
        id: { type: String, default: randomUUID, unique: true, index: true },
        owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true, select: false },
        title: { type: String, required: true, trim: true, minlength: 1, maxlength: 100 },
        description: { type: String, required: true, trim: true, minlength: 1, maxlength: 500 },
        category: { type: String, required: true, enum: taskCategories },
        priority: { type: String, required: true, enum: taskPriorities },
        dueDate: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ },
        tags: [{ type: String, enum: taskTags }],
        completed: { type: Boolean, default: false },
        archived: { type: Boolean, default: false },
        completedAt: { type: Date, default: null },
        archivedAt: { type: Date, default: null },
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform(document, result) {
                void document
                delete result._id
                delete result.owner
                result.createdAt = result.createdAt.toISOString()
                result.updatedAt = result.updatedAt.toISOString()
                result.completedAt = result.completedAt?.toISOString() ?? null
                result.archivedAt = result.archivedAt?.toISOString() ?? null
                return result
            },
        },
    },
)

taskSchema.index({ owner: 1, createdAt: -1 })

const Task = mongoose.models.Task ?? mongoose.model('Task', taskSchema)

export default Task
