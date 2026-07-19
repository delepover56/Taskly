import Button from '@/components/ui/Button'

const App = () => {
  return (
    <main className="min-h-screen bg-slate-50 p-8 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      <section className="mx-auto max-w-3xl space-y-6">
        <h1 className="font-display text-3xl font-bold">
          Taskly UI Components
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={() => alert("Task added!")}>
            Add Task
          </Button>
          <Button variant="secondary">
            Cancel
          </Button>
          <Button variant="ghost">
            View Details
          </Button>
          <Button variant="danger">
            Delete
          </Button>
          <Button disabled>
            Saving...
          </Button>
        </div>
      </section>
    </main>
  )
}

export default App
