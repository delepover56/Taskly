import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
        username: { type: String, required: true, unique: true, lowercase: true, trim: true, minlength: 3, maxlength: 20, match: /^[a-z0-9_]+$/ },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true, maxlength: 254 },
        passwordHash: { type: String, required: true, select: false },
        avatarSrc: { type: String, default: null },
        avatarPublicId: { type: String, default: null, select: false },
        isEmailVerified: { type: Boolean, default: false },
        starterTasksCreated: { type: Boolean, default: false },
        verificationCodeHash: { type: String, default: null, select: false },
        verificationExpiresAt: { type: Date, default: null, select: false },
        verificationLastSentAt: { type: Date, default: null, select: false },
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform(document, result) {
                void document
                result.id = result._id.toString()
                delete result._id
                delete result.passwordHash
                delete result.avatarPublicId
                delete result.starterTasksCreated
                delete result.verificationCodeHash
                delete result.verificationExpiresAt
                delete result.verificationLastSentAt
                return result
            },
        },
    },
)

const User = mongoose.models.User ?? mongoose.model('User', userSchema)

export default User
