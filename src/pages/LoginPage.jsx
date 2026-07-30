import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { ArrowRight, LockKeyhole, Mail } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useAuthStore } from '@/features/auth/store/useAuthStore'
import tasklyLogo from '@/assets/logos/Taskly-Logo.svg'

const LoginPage = () => {
    const navigate = useNavigate()
    const login = useAuthStore((state) => state.login)
    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!form.email.includes('@') || form.password.length < 6) {
            setError('Enter a valid email and a password with at least 6 characters.')
            return
        }
        login(form)
        navigate('/', { replace: true })
    }

    return (
        <main className="grid min-h-screen bg-background lg:grid-cols-2">
            <section className="hidden bg-primary/10 p-12 lg:flex lg:flex-col lg:justify-between">
                <div className="flex items-center gap-3"><img className="size-10" src={tasklyLogo} alt="" /><span className="font-display text-2xl font-bold text-foreground">Taskly</span></div>
                <div className="max-w-lg"><p className="text-xs font-bold tracking-[0.18em] text-primary uppercase">Welcome back</p><h1 className="mt-4 font-display text-5xl font-bold leading-tight text-foreground">Pick up where you left off.</h1><p className="mt-5 text-base leading-7 text-muted">Your priorities, due dates, and progress are ready when you are.</p></div>
                <p className="text-xs text-muted">Frontend authentication preview</p>
            </section>
            <section className="grid place-items-center px-5 py-12">
                <div className="w-full max-w-sm">
                    <div className="mb-8 flex items-center gap-3 lg:hidden"><img className="size-9" src={tasklyLogo} alt="" /><span className="font-display text-xl font-bold text-foreground">Taskly</span></div>
                    <h2 className="font-display text-3xl font-bold text-foreground">Log in</h2>
                    <p className="mt-2 text-sm text-muted">Access your Taskly workspace.</p>
                    <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
                        <label className="grid gap-1.5 text-xs font-semibold text-body"><span className="flex items-center gap-2"><Mail className="size-3.5" />Email address</span><Input type="email" autoComplete="email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} placeholder="you@example.com" /></label>
                        <label className="grid gap-1.5 text-xs font-semibold text-body"><span className="flex items-center gap-2"><LockKeyhole className="size-3.5" />Password</span><Input type="password" autoComplete="current-password" value={form.password} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} placeholder="At least 6 characters" /></label>
                        {error && <p className="rounded-lg bg-danger/10 px-3 py-2 text-xs font-semibold text-danger" role="alert">{error}</p>}
                        <Button className="mt-2 w-full" type="submit">Log in <ArrowRight className="size-4" /></Button>
                    </form>
                    <p className="mt-6 text-center text-sm text-muted">New to Taskly? <Link className="font-semibold text-primary hover:underline" to="/signup">Create an account</Link></p>
                </div>
            </section>
        </main>
    )
}

export default LoginPage
