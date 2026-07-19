import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const PlaygroundPage = () => {
    return (
        <main className="min-h-screen px-5 py-10 sm:px-8">
            <div className="mx-auto max-w-4xl space-y-8">
                <header>
                    <p className="mb-2 text-xs font-bold tracking-widest text-primary uppercase">
                        Design system
                    </p>

                    <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
                        Taskly UI Playground
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm text-muted">
                        Reusable components styled with Taskly&apos;s visual language.
                    </p>
                </header>

                <section className="rounded-card border border-border bg-surface p-6 shadow-card backdrop-blur-lg">
                    <div className="mb-5">
                        <h2 className="font-display text-lg font-bold text-foreground">
                            Buttons
                        </h2>

                        <p className="mt-1 text-sm text-muted">
                            Actions with different levels of importance.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Button>Add task</Button>

                        <Button variant="secondary">
                            Cancel
                        </Button>

                        <Button variant="ghost">
                            View details
                        </Button>

                        <Button variant="danger">
                            Delete
                        </Button>

                        <Button disabled>
                            Saving...
                        </Button>
                    </div>
                </section>

                <section className="rounded-card border border-border bg-surface p-6 shadow-card backdrop-blur-lg">
                    <div className="mb-5">
                        <h2 className="font-display text-lg font-bold text-foreground">
                            Inputs
                        </h2>

                        <p className="mt-1 text-sm text-muted">
                            Form controls for task and settings forms.
                        </p>
                    </div>

                    <div className="grid max-w-sm gap-3">
                        <Input
                            type="text"
                            placeholder="What needs to be done?"
                            aria-label="Task title"
                        />

                        <Input
                            type="email"
                            placeholder="taha@example.com"
                            aria-label="Email address"
                        />

                        <Input
                            placeholder="Disabled input"
                            aria-label="Disabled input"
                            disabled
                        />

                        <Input
                            placeholder="Invalid input"
                            aria-label="Invalid input"
                            aria-invalid
                        />
                    </div>
                </section>
            </div>
        </main>
    )
}

export default PlaygroundPage