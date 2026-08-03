import { v2 as cloudinary } from 'cloudinary'

const configureCloudinary = () => {
    const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
        const error = new Error('Profile image storage is not configured.')
        error.statusCode = 503
        error.code = 'IMAGE_STORAGE_NOT_CONFIGURED'
        throw error
    }

    cloudinary.config({
        cloud_name: CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET,
        secure: true,
    })
}

export const uploadAvatar = async ({ dataUrl, userId }) => {
    configureCloudinary()
    return cloudinary.uploader.upload(dataUrl, {
        folder: 'taskly/avatars',
        public_id: userId,
        overwrite: true,
        resource_type: 'image',
        transformation: [{ width: 512, height: 512, crop: 'fill', gravity: 'face', quality: 'auto', fetch_format: 'auto' }],
    })
}

export const deleteAvatar = async (publicId) => {
    if (!publicId) return
    configureCloudinary()
    await cloudinary.uploader.destroy(publicId, { resource_type: 'image', invalidate: true })
}
