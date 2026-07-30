import { useRef, useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'

const OUTPUT_SIZE = 512

const AvatarCropDialog = ({ imageSrc, onCancel, onCrop }) => {
    const imageRef = useRef(null)
    const [zoom, setZoom] = useState(1)
    const [positionX, setPositionX] = useState(50)
    const [positionY, setPositionY] = useState(50)

    const saveCrop = () => {
        const image = imageRef.current
        if (!image) return

        const baseScale = Math.max(OUTPUT_SIZE / image.naturalWidth, OUTPUT_SIZE / image.naturalHeight)
        const scale = baseScale * zoom
        const drawnWidth = image.naturalWidth * scale
        const drawnHeight = image.naturalHeight * scale
        const overflowX = Math.max(0, drawnWidth - OUTPUT_SIZE)
        const overflowY = Math.max(0, drawnHeight - OUTPUT_SIZE)
        const offsetX = -(overflowX * positionX / 100)
        const offsetY = -(overflowY * positionY / 100)
        const canvas = document.createElement('canvas')
        canvas.width = OUTPUT_SIZE
        canvas.height = OUTPUT_SIZE
        canvas.getContext('2d').drawImage(image, offsetX, offsetY, drawnWidth, drawnHeight)
        onCrop(canvas.toDataURL('image/jpeg', 0.9))
    }

    return (
        <Dialog
            open={Boolean(imageSrc)}
            onClose={onCancel}
            title="Crop profile picture"
            description="Position and zoom the image before saving it."
            footer={<><Button variant="secondary" onClick={onCancel}>Cancel</Button><Button onClick={saveCrop}>Save picture</Button></>}
        >
            <div className="mx-auto aspect-square w-full max-w-80 overflow-hidden rounded-full bg-control-muted">
                {imageSrc && (
                    <img
                        ref={imageRef}
                        className="size-full object-cover"
                        src={imageSrc}
                        alt="Profile picture crop preview"
                        style={{ objectPosition: `${positionX}% ${positionY}%`, transform: `scale(${zoom})` }}
                    />
                )}
            </div>
            <div className="mt-5 grid gap-4">
                <label className="grid gap-2 text-xs font-semibold text-body">Zoom<input type="range" min="1" max="3" step="0.05" value={zoom} onChange={(event) => setZoom(Number(event.target.value))} /></label>
                <label className="grid gap-2 text-xs font-semibold text-body">Horizontal position<input type="range" min="0" max="100" value={positionX} onChange={(event) => setPositionX(Number(event.target.value))} /></label>
                <label className="grid gap-2 text-xs font-semibold text-body">Vertical position<input type="range" min="0" max="100" value={positionY} onChange={(event) => setPositionY(Number(event.target.value))} /></label>
            </div>
        </Dialog>
    )
}

export default AvatarCropDialog
