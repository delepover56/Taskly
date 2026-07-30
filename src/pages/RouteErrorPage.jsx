import { AlertTriangle, RotateCcw } from 'lucide-react'
import { isRouteErrorResponse, useRouteError } from 'react-router'
import Button from '@/components/ui/Button'

const RouteErrorPage = () => {
    const error = useRouteError()
    const message = isRouteErrorResponse(error)
        ? `${error.status} ${error.statusText}`
        : error?.message || 'Something unexpected happened.'

    return (
        <main className="grid min-h-screen place-items-center bg-background px-5 text-center">
            <div className="max-w-md rounded-card border border-border bg-card p-8 shadow-card">
                <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-danger/10 text-danger"><AlertTriangle className="size-7" /></span>
                <h1 className="mt-5 font-display text-2xl font-bold text-foreground">Taskly hit a snag</h1>
                <p className="mt-2 text-sm leading-6 text-muted">{message}</p>
                <Button className="mt-6" onClick={() => window.location.reload()}><RotateCcw className="size-4" />Reload workspace</Button>
            </div>
        </main>
    )
}

export default RouteErrorPage
