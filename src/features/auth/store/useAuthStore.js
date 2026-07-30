import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            account: null,

            signUp: ({ name, email }) => {
                const account = {
                    id: crypto.randomUUID(),
                    name: name.trim(),
                    email: email.trim().toLowerCase(),
                    avatarSrc: null,
                    createdAt: new Date().toISOString(),
                }
                set({ account, user: null })
                return account
            },

            login: ({ email }) => {
                const normalizedEmail = email.trim().toLowerCase()
                const existingAccount = get().account
                const user = existingAccount?.email === normalizedEmail
                    ? existingAccount
                    : {
                        id: crypto.randomUUID(),
                        name: normalizedEmail.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()),
                        email: normalizedEmail,
                        avatarSrc: null,
                        createdAt: new Date().toISOString(),
                    }
                set({ user })
                return user
            },

            updateProfile: (profile) => {
                set((state) => {
                    if (!state.user) return state
                    const user = { ...state.user, ...profile }
                    return {
                        user,
                        account: state.account?.id === user.id ? user : state.account,
                    }
                })
            },

            logout: () => set({ user: null }),
        }),
        { name: 'taskly-auth-preview-v1' },
    ),
)
