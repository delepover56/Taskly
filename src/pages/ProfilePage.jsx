import { useState } from 'react'
import { Camera, LogOut, Mail, Save, Trash2, UserRound } from 'lucide-react'
import { toast } from 'sonner'
import PageContainer from '@/components/layout/PageContainer'
import AvatarCropDialog from '@/components/profile/AvatarCropDialog'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { useAuthStore } from '@/features/auth/store/useAuthStore'
import { useTaskStore } from '@/features/tasks/store/useTaskStore'

const ProfilePage = () => {
    const user = useAuthStore((state) => state.user)
    const updateProfile = useAuthStore((state) => state.updateProfile)
    const updateAvatar = useAuthStore((state) => state.updateAvatar)
    const removeAvatar = useAuthStore((state) => state.removeAvatar)
    const logout = useAuthStore((state) => state.logout)
    const tasks = useTaskStore((state) => state.tasks)
    const [form, setForm] = useState({ name: user.name, username: user.username, email: user.email })
    const [avatarDraft, setAvatarDraft] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const active = tasks.filter((task) => !task.archived && !task.completed).length
    const completed = tasks.filter((task) => !task.archived && task.completed).length

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (form.name.trim().length < 2) {
            toast.error('Enter a valid display name.')
            return
        }
        if (!/^[a-zA-Z0-9_]{3,20}$/.test(form.username.trim())) {
            toast.error('Username must be 3-20 characters using letters, numbers, or underscores.')
            return
        }

        setIsSubmitting(true)
        try {
            await updateProfile({ name: form.name.trim(), username: form.username.trim().toLowerCase() })
            toast.success('Profile updated.')
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleAvatarChange = (event) => {
        const file = event.target.files?.[0]
        if (!file) return
        if (!file.type.startsWith('image/')) {
            toast.error('Choose an image file.')
            return
        }
        if (file.size > 2 * 1024 * 1024) {
            toast.error('Profile pictures must be smaller than 2 MB.')
            return
        }

        const reader = new FileReader()
        reader.onload = () => {
            setAvatarDraft(reader.result)
        }
        reader.onerror = () => toast.error('The selected image could not be read.')
        reader.readAsDataURL(file)
        event.target.value = ''
    }

    return (
        <main>
            <PageContainer className="py-8">
                <header><p className="text-[10px] font-bold tracking-[0.18em] text-primary uppercase">Account</p><h1 className="mt-2 font-display text-3xl font-bold text-foreground">Your profile</h1><p className="mt-2 text-sm text-muted">Manage the identity used across your Taskly workspace.</p></header>
                <div className="mt-6 grid items-start gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
                    <Card className="p-6 text-center">
                        <span className="mx-auto grid size-24 place-items-center overflow-hidden rounded-full bg-control-muted text-muted">{user.avatarSrc ? <img className="size-full object-cover" src={user.avatarSrc} alt="" /> : <UserRound className="size-10" />}</span>
                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                            <label className="inline-flex h-8 cursor-pointer items-center gap-2 rounded-control bg-control-muted px-3 text-xs font-semibold text-body transition hover:text-foreground"><Camera className="size-3.5" />{user.avatarSrc ? 'Change photo' : 'Add photo'}<input className="sr-only" type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={handleAvatarChange} /></label>
                            {user.avatarSrc && <button className="inline-flex h-8 items-center gap-2 rounded-control px-3 text-xs font-semibold text-danger hover:bg-danger/10" type="button" onClick={async () => { try { await removeAvatar(); toast.success('Profile picture removed.') } catch (error) { toast.error(error.message) } }}><Trash2 className="size-3.5" />Remove</button>}
                        </div>
                        <p className="mt-2 text-[10px] text-muted">PNG, JPG, WebP, or GIF. Maximum 2 MB.</p>
                        <h2 className="mt-4 font-display text-lg font-bold text-foreground">{user.name}</h2><p className="mt-1 text-xs font-semibold text-primary">@{user.username}</p><p className="mt-1 text-xs text-muted">{user.email}</p>
                        <div className="mt-5 grid grid-cols-2 gap-2"><div className="rounded-xl bg-control p-3"><strong className="font-display text-xl text-foreground">{active}</strong><span className="block text-[10px] text-muted">Open tasks</span></div><div className="rounded-xl bg-control p-3"><strong className="font-display text-xl text-foreground">{completed}</strong><span className="block text-[10px] text-muted">Completed</span></div></div>
                        <Button className="mt-5 w-full" variant="secondary" onClick={logout}><LogOut className="size-4" />Log out</Button>
                    </Card>
                    <Card className="p-6">
                        <h2 className="font-display text-lg font-bold text-foreground">Profile details</h2><p className="mt-1 text-xs text-muted">Update the information shown in your account menu.</p>
                        <form className="mt-6 grid max-w-lg gap-4" onSubmit={handleSubmit}>
                            <label className="grid gap-1.5 text-xs font-semibold text-body"><span className="flex items-center gap-2"><UserRound className="size-3.5" />Display name</span><Input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} /></label>
                            <label className="grid gap-1.5 text-xs font-semibold text-body"><span className="flex items-center gap-2"><UserRound className="size-3.5" />Username</span><Input value={form.username} onChange={(event) => setForm((current) => ({ ...current, username: event.target.value }))} /></label>
                            <label className="grid gap-1.5 text-xs font-semibold text-body"><span className="flex items-center gap-2"><Mail className="size-3.5" />Email address</span><Input type="email" value={form.email} readOnly aria-describedby="email-change-note" /><span id="email-change-note" className="text-[10px] font-normal text-muted">Email changes require a separate verification flow.</span></label>
                            <Button className="mt-2 w-fit" type="submit" disabled={isSubmitting}><Save className="size-4" />{isSubmitting ? 'Saving...' : 'Save changes'}</Button>
                        </form>
                    </Card>
                </div>
            </PageContainer>
            <AvatarCropDialog key={avatarDraft} imageSrc={avatarDraft} onCancel={() => setAvatarDraft(null)} onCrop={async (avatarSrc) => { try { await updateAvatar(avatarSrc); setAvatarDraft(null); toast.success('Profile picture updated.') } catch (error) { toast.error(error.message) } }} />
        </main>
    )
}

export default ProfilePage
