import { createBrowserRouter } from 'react-router'
import AppLayout from '@/components/layout/AppLayout'
import PlaygroundPage from '@/pages/PlaygroundPage'
import WorkspacePage from '@/pages/WorkspacePage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: (
                    <WorkspacePage
                        title="Dashboard"
                        description="An overview of your tasks and productivity."
                    />
                ),
            },
            {
                path: 'today',
                element: (
                    <WorkspacePage
                        title="Today"
                        description="Tasks that need your attention today."
                    />
                ),
            },
            {
                path: 'upcoming',
                element: (
                    <WorkspacePage
                        title="Upcoming"
                        description="Plan for tasks due after today."
                    />
                ),
            },
            {
                path: 'important',
                element: (
                    <WorkspacePage
                        title="Important"
                        description="Your unfinished High-priority tasks."
                    />
                ),
            },
            {
                path: 'completed',
                element: (
                    <WorkspacePage
                        title="Completed"
                        description="Review the tasks you have finished."
                    />
                ),
            },
            {
                path: 'archived',
                element: (
                    <WorkspacePage
                        title="Archived"
                        description="Tasks removed from your active workspace."
                    />
                ),
            },
            {
                path: '*',
                element: (
                    <WorkspacePage
                        title="Page not found"
                        description="The requested Taskly page does not exist."
                    />
                ),
            },
        ],
    },
    {
        path: '/playground',
        element: <PlaygroundPage />,
    },
])

export default router