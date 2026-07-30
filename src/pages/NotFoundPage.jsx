import { Link } from 'react-router'

const NotFoundPage = () => (
    <main className="grid min-h-[70vh] place-items-center px-5 text-center">
        <div>
            <p className="font-display text-7xl font-bold text-primary">404</p>
            <h1 className="mt-3 font-display text-2xl font-bold text-foreground">This page wandered off</h1>
            <p className="mt-2 text-sm text-muted">Let’s get you back to your workspace.</p>
            <Link className="mt-5 inline-flex h-[38px] items-center rounded-control bg-primary px-4 text-sm font-semibold text-white shadow-primary" to="/">Return to dashboard</Link>
        </div>
    </main>
)

export default NotFoundPage
