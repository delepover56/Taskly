import { create } from 'zustand'
import { apiRequest } from '@/lib/api'

export const useAuthStore = create((set, get) => ({
    user: null,
    csrfToken: null,
    status: 'idle',

    initialize: async () => {
        if (get().status !== 'idle') return
        set({ status: 'loading' })
        try {
            const session = await apiRequest('/auth/me')
            set({ user: session.user, csrfToken: session.csrfToken, status: 'ready' })
        } catch {
            set({ user: null, csrfToken: null, status: 'ready' })
        }
    },

    signUp: async ({ name, username, email, password }) => apiRequest('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ name, username, email, password }),
    }),

    verifyEmail: async ({ email, code }) => apiRequest('/auth/verify-email', {
        method: 'POST',
        body: JSON.stringify({ email, code }),
    }),

    resendVerification: async (email) => apiRequest('/auth/resend-verification', {
        method: 'POST',
        body: JSON.stringify({ email }),
    }),

    login: async ({ email, password }) => {
        const session = await apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        })
        set({ user: session.user, csrfToken: session.csrfToken, status: 'ready' })
        return session.user
    },

    updateProfile: (profile) => set((state) => ({
        user: state.user ? { ...state.user, ...profile } : null,
    })),

    isUsernameAvailable: () => true,

    logout: async () => {
        const csrfToken = get().csrfToken
        try {
            if (csrfToken) await apiRequest('/auth/logout', { method: 'POST', csrfToken })
        } finally {
            set({ user: null, csrfToken: null, status: 'ready' })
        }
    },
}))
