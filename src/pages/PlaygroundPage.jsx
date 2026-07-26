import { useState } from 'react'
import { Bell } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Checkbox from '@/components/ui/Checkbox'
import Dialog from '@/components/ui/Dialog'
import IconButton from '@/components/ui/IconButton'
import Input from '@/components/ui/Input'
import SearchField from '@/components/ui/SearchField'
import Select from '@/components/ui/Select'
import Skeleton from '@/components/ui/Skeleton'
import Textarea from '@/components/ui/Textarea'

const PlaygroundPage = () => {
    const [dialogOpen, setDialogOpen] = useState(false)

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

                <Card className="p-6">
                    <h2 className="font-display text-lg font-bold text-foreground">Buttons</h2>
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                        <Button>Add task</Button>
                        <Button variant="secondary">Cancel</Button>
                        <Button variant="ghost">View details</Button>
                        <Button variant="danger">Delete</Button>
                        <Button disabled>Saving...</Button>
                    </div>
                </Card>

                <Card className="p-6">
                    <h2 className="font-display text-lg font-bold text-foreground">Inputs</h2>
                    <div className="mt-5 grid max-w-sm gap-3">
                        <Input placeholder="What needs to be done?" aria-label="Task title" />
                        <Input type="email" placeholder="taha@example.com" aria-label="Email address" />
                        <Input placeholder="Disabled input" aria-label="Disabled input" disabled />
                        <Input placeholder="Invalid input" aria-label="Invalid input" aria-invalid />
                    </div>
                </Card>

                <Card className="p-6">
                    <h2 className="font-display text-lg font-bold text-foreground">Search fields</h2>
                    <div className="mt-5 grid max-w-sm gap-3">
                        <SearchField aria-label="Search tasks" />
                        <SearchField placeholder="Search completed tasks" aria-label="Search completed tasks" />
                        <SearchField placeholder="Search unavailable" aria-label="Search unavailable" disabled />
                    </div>
                </Card>

                <Card className="p-6">
                    <h2 className="font-display text-lg font-bold text-foreground">Badges</h2>
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                        <Badge>Work</Badge>
                        <Badge varient="primary">Desk</Badge>
                        <Badge varient="success">Completed</Badge>
                        <Badge varient="warning">Medium</Badge>
                        <Badge varient="danger">High</Badge>
                    </div>
                </Card>

                <Card className="p-6">
                    <h2 className="font-display text-lg font-bold text-foreground">
                        Form and feedback primitives
                    </h2>
                    <div className="mt-5 grid gap-5 md:grid-cols-2">
                        <div className="grid gap-3">
                            <label className="flex items-center gap-2 text-sm text-body">
                                <Checkbox defaultChecked />
                                Show completed tasks
                            </label>
                            <Select aria-label="Task priority" defaultValue="Medium">
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                            </Select>
                            <Textarea aria-label="Task description" placeholder="Add task details..." />
                        </div>

                        <div className="grid content-start gap-4">
                            <div className="flex items-center gap-3">
                                <IconButton aria-label="Notifications">
                                    <Bell className="size-4" />
                                </IconButton>
                                <Button onClick={() => setDialogOpen(true)}>Open dialog</Button>
                            </div>
                            <div className="grid gap-2" aria-label="Loading preview">
                                <Skeleton className="h-4 w-2/3" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>
                        </div>
                    </div>
                </Card>

                <Dialog
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    title="Dialog preview"
                    description="This previews the shared dialog container."
                    footer={(
                        <>
                            <Button variant="secondary" onClick={() => setDialogOpen(false)}>Cancel</Button>
                            <Button onClick={() => setDialogOpen(false)}>Confirm</Button>
                        </>
                    )}
                >
                    <p className="text-sm text-body">
                        Feature-specific forms will place their own validated fields here.
                    </p>
                </Dialog>
            </div>
        </main>
    )
}

export default PlaygroundPage
