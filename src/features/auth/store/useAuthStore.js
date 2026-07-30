import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            account: null,
            accounts: [],

            isUsernameAvailable: (username, excludedId) => {
                const normalized = username.trim().toLowerCase()
                return !get().accounts.some((item) => item.id !== excludedId && item.username.toLowerCase() === normalized)
            },

            signUp: ({ name, username, email }) => {
                const account = {
                    id: crypto.randomUUID(),
                    name: name.trim(),
                    username: username.trim().toLowerCase(),
                    email: email.trim().toLowerCase(),
                    avatarSrc: null,
                    createdAt: new Date().toISOString(),
                }
                set((state) => ({ account, accounts: [...state.accounts, account], user: null }))
                return account
            },

            login: ({ email }) => {
                const normalizedEmail = email.trim().toLowerCase()
                const existingAccount = get().accounts.find((item) => item.email === normalizedEmail) ?? get().account
                const user = existingAccount?.email === normalizedEmail
                    ? existingAccount
                    : {
                        id: crypto.randomUUID(),
                        name: normalizedEmail.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()),
                        username: normalizedEmail.split('@')[0].replace(/[^a-z0-9_]/g, ''),
                        email: normalizedEmail,
                        avatarSrc: null,
                        createdAt: new Date().toISOString(),
                    }
                set((state) => ({
                    user,
                    account: user,
                    accounts: state.accounts.some((item) => item.id === user.id) ? state.accounts : [...state.accounts, user],
                }))
                return user
            },

            updateProfile: (profile) => {
                set((state) => {
                    if (!state.user) return state
                    const user = { ...state.user, ...profile }
                    return {
                        user,
                        account: state.account?.id === user.id ? user : state.account,
                        accounts: state.accounts.map((item) => item.id === user.id ? user : item),
                    }
                })
            },

            logout: () => set({ user: null }),
        }),
        {
            name: 'taskly-auth-preview-v1',
            version: 2,
            migrate: (persistedState) => {
                const account = persistedState.account
                const username = account?.username ?? account?.email?.split('@')[0].replace(/[^a-z0-9_]/g, '')
                const migratedAccount = account ? { ...account, username } : null
                const user = persistedState.user
                    ? { ...persistedState.user, username: persistedState.user.username ?? username }
                    : null
                return {
                    ...persistedState,
                    account: migratedAccount,
                    user,
                    accounts: migratedAccount ? [migratedAccount] : [],
                }
            },
        },
    ),
)
