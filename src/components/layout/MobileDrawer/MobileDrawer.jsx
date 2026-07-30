import Sidebar from '@/components/layout/Sidebar'

const MobileDrawer = ({ open, onClose }) => {
    if (!open) return null
    return (
        <div className="fixed inset-0 z-50 lg:hidden">
            <button className="absolute inset-0 bg-slate-950/65 backdrop-blur-sm" type="button" aria-label="Close navigation" onClick={onClose} />
            <Sidebar className="relative z-10 h-full shadow-2xl" onNavigate={onClose} />
        </div>
    )
}

export default MobileDrawer
