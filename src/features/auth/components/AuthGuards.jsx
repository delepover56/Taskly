import { Navigate, useLocation } from 'react-router'
import { useAuthStore } from '@/features/auth/store/useAuthStore'

export const RequireAuth = ({ children }) => {
    const user = useAuthStore((state) => state.user)
    const location = useLocation()

    if (!user) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />
    }

    return children
}

export const GuestOnly = ({ children }) => {
    const user = useAuthStore((state) => state.user)

    if (user) {
        return <Navigate to="/" replace />
    }

    return children
}
