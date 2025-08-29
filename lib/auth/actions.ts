"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"

/**
 * Get current authenticated user from session cookie
 */
export async function getCurrentUser() {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get("auth_session")?.value

    if (!sessionToken) {
      return null
    }

    // Make a request to our auth API to validate the session
    const response = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/auth/[...better-auth]`, {
      headers: {
        Cookie: `auth_session=${sessionToken}`
      }
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data.user
  } catch (error) {
    console.error("Get current user error:", error)
    return null
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated() {
  const user = await getCurrentUser()
  return !!user
}

/**
 * Require authentication - redirects to sign-in if not authenticated
 */
export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/sign-in")
  }
  return user
}
