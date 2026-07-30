import { createBrowserRouter } from 'react-router'
import AppLayout from '@/components/layout/AppLayout'
import { GuestOnly, RequireAuth } from '@/features/auth/components/AuthGuards'
import LoginPage from '@/pages/LoginPage'
import NotFoundPage from '@/pages/NotFoundPage'
import ProfilePage from '@/pages/ProfilePage'
import RouteErrorPage from '@/pages/RouteErrorPage'
import SignupPage from '@/pages/SignupPage'
import WorkspacePage from '@/pages/WorkspacePage'

export const router = createBrowserRouter([
    {
        path: 'login',
        element: <GuestOnly><LoginPage /></GuestOnly>,
        errorElement: <RouteErrorPage />,
    },
    {
        path: 'signup',
        element: <GuestOnly><SignupPage /></GuestOnly>,
        errorElement: <RouteErrorPage />,
    },
    {
        element: <AppLayout />,
        errorElement: <RouteErrorPage />,
        children: [
            { index: true, element: <WorkspacePage view="dashboard" /> },
            { path: 'today', element: <WorkspacePage view="today" /> },
            { path: 'upcoming', element: <WorkspacePage view="upcoming" /> },
            { path: 'important', element: <WorkspacePage view="important" /> },
            { path: 'completed', element: <WorkspacePage view="completed" /> },
            { path: 'archived', element: <WorkspacePage view="archived" /> },
            { path: 'profile', element: <RequireAuth><ProfilePage /></RequireAuth> },
            { path: '*', element: <NotFoundPage /> },
        ],
    },
])
