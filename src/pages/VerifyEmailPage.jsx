import { useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { ArrowRight, MailCheck } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useAuthStore } from '@/features/auth/store/useAuthStore'
import tasklyLogo from '@/assets/logos/Taskly-Logo.svg'
import { gsap, prefersReducedMotion, useGSAP } from '@/lib/gsap'

const VerifyEmailPage = () => {
    const navigate = useNavigate()
    const pageRef = useRef(null)
    const [searchParams] = useSearchParams()
    const email = searchParams.get('email') ?? ''
    const verifyEmail = useAuthStore((state) => state.verifyEmail)
    const resendVerification = useAuthStore((state) => state.resendVerification)
    const [code, setCode] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    useGSAP(() => {
        if (prefersReducedMotion()) return
        gsap.from('[data-auth-panel]', { autoAlpha: 0, scale: 0.99, duration: 0.4, stagger: 0.08, ease: 'power2.out' })
    }, { scope: pageRef })

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!email || !/^\d{6}$/.test(code)) {
            setError('Enter the 6-digit code from your email.')
            return
        }

        setError('')
        setMessage('')
        setIsSubmitting(true)
        try {
            await verifyEmail({ email, code })
            navigate('/login', { replace: true, state: { emailVerified: true } })
        } catch (requestError) {
            setError(requestError.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleResend = async () => {
        if (!email) {
            setError('Return to signup and enter your email address again.')
            return
        }

        setError('')
        setMessage('')
        try {
            const result = await resendVerification(email)
            setMessage(result.message)
        } catch (requestError) {
            setError(requestError.message)
        }
    }

    return (
        <main ref={pageRef} className="grid min-h-screen overflow-hidden bg-background lg:grid-cols-2">
            <section data-auth-panel className="hidden bg-primary/10 p-12 lg:flex lg:flex-col lg:justify-between">
                <div className="flex items-center gap-3"><img className="size-10" src={tasklyLogo} alt="" /><span className="font-display text-2xl font-bold text-foreground">Taskly</span></div>
                <div className="max-w-lg"><p className="text-xs font-bold tracking-[0.18em] text-primary uppercase">One last step</p><h1 className="mt-4 font-display text-5xl font-bold leading-tight text-foreground">Verify your email.</h1><p className="mt-5 text-base leading-7 text-muted">Confirm that this email belongs to you before accessing your workspace.</p></div>
                <p className="text-xs text-muted">Verification codes expire after 10 minutes.</p>
            </section>
            <section data-auth-panel className="grid place-items-center px-5 py-12">
                <div className="w-full max-w-sm">
                    <div className="mb-8 flex items-center gap-3 lg:hidden"><img className="size-9" src={tasklyLogo} alt="" /><span className="font-display text-xl font-bold text-foreground">Taskly</span></div>
                    <MailCheck className="mb-5 size-9 text-primary" />
                    <h2 className="font-display text-3xl font-bold text-foreground">Check your email</h2>
                    <p className="mt-2 text-sm leading-6 text-muted">Enter the six-digit code sent to <span className="font-semibold text-body">{email || 'your email address'}</span>.</p>
                    <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
                        <label className="grid gap-1.5 text-xs font-semibold text-body">Verification code<Input inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="000000" /></label>
                        {error && <p className="rounded-lg bg-danger/10 px-3 py-2 text-xs font-semibold text-danger" role="alert">{error}</p>}
                        {message && <p className="rounded-lg bg-success/10 px-3 py-2 text-xs font-semibold text-success" role="status">{message}</p>}
                        <Button className="mt-2 w-full" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Verifying...' : 'Verify email'} {!isSubmitting && <ArrowRight className="size-4" />}</Button>
                    </form>
                    <div className="mt-6 flex items-center justify-between text-sm"><button className="font-semibold text-primary hover:underline" type="button" onClick={handleResend}>Send another code</button><Link className="text-muted hover:text-foreground" to="/signup">Back to signup</Link></div>
                </div>
            </section>
        </main>
    )
}

export default VerifyEmailPage
