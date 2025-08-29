import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  name: string | null
  email: string
  emailVerified: boolean
  image: string | null
  createdAt: Date
  updatedAt: Date
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null

  // Actions
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearAuth: () => void
  checkAuthStatus: () => Promise<void>
}

export const authStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setUser: user =>
        set({
          user,
          isAuthenticated: !!user,
          error: null
        }),

      setLoading: isLoading => set({ isLoading }),

      setError: error => set({ error }),

      clearAuth: () =>
        set({
          user: null,
          isAuthenticated: false,
          error: null
        }),

      checkAuthStatus: async () => {
        try {
          const response = await fetch("/api/auth/[...better-auth]")
          const data = await response.json()

          if (data.user) {
            set({ user: data.user, isAuthenticated: true, error: null })
          } else {
            set({ user: null, isAuthenticated: false, error: null })
          }
        } catch (error) {
          console.error("Failed to check auth status:", error)
          set({ user: null, isAuthenticated: false, error: null })
        }
      }
    }),
    {
      name: "auth-storage",
      partialize: state => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
)
