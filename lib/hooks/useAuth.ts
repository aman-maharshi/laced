"use client"

import { create } from "zustand"
import { signIn, signUp, signOut, getCurrentUser } from "@/lib/auth/actions"

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
  isLoading: boolean
  isAuthenticated: boolean
  error: string | null

  // Actions
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  refreshUser: () => Promise<void>
  clearError: () => void
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,

  signIn: async (email: string, password: string) => {
    set({ isLoading: true, error: null })

    try {
      const result = await signIn({ email, password })

      if (result.error) {
        set({ error: result.error, isLoading: false })
        return
      }

      if (result.success && result.user) {
        set({
          user: result.user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        })
      }
    } catch (error) {
      set({
        error: "An unexpected error occurred",
        isLoading: false
      })
    }
  },

  signUp: async (name: string, email: string, password: string) => {
    set({ isLoading: true, error: null })

    try {
      const result = await signUp({ name, email, password })

      if (result.error) {
        set({ error: result.error, isLoading: false })
        return
      }

      if (result.success && result.user) {
        set({
          user: result.user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        })
      }
    } catch (error) {
      set({
        error: "An unexpected error occurred",
        isLoading: false
      })
    }
  },

  signOut: async () => {
    set({ isLoading: true })

    try {
      await signOut()
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      })
    } catch (error) {
      set({
        error: "Failed to sign out",
        isLoading: false
      })
    }
  },

  refreshUser: async () => {
    set({ isLoading: true })

    try {
      const user = await getCurrentUser()

      if (user) {
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        })
      } else {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null
        })
      }
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: "Failed to refresh user data"
      })
    }
  },

  clearError: () => {
    set({ error: null })
  }
}))

// Initialize auth state on mount
if (typeof window !== "undefined") {
  useAuth.getState().refreshUser()
}
