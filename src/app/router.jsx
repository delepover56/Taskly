import { createBrowserRouter } from 'react-router'
import AppLayout from '@/components/layout/AppLayout'
import NotFoundPage from '@/pages/NotFoundPage'
import WorkspacePage from '@/pages/WorkspacePage'

export const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            { index: true, element: <WorkspacePage view="dashboard" /> },
            { path: 'today', element: <WorkspacePage view="today" /> },
            { path: 'upcoming', element: <WorkspacePage view="upcoming" /> },
            { path: 'important', element: <WorkspacePage view="important" /> },
            { path: 'completed', element: <WorkspacePage view="completed" /> },
            { path: 'archived', element: <WorkspacePage view="archived" /> },
            { path: '*', element: <NotFoundPage /> },
        ],
    },
])
