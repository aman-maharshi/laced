import { cookies } from "next/headers"
import { db } from "@/lib/db"
import { users, sessions, guests } from "@/lib/db/schema"

// Cookie names
export const AUTH_SESSION_COOKIE = "auth_session"
export const GUEST_SESSION_COOKIE = "guest_session"

/**
 * Get the current session token from cookies
 */
export function getAuthSessionToken(): string | undefined {
  return cookies().get(AUTH_SESSION_COOKIE)?.value
}

/**
 * Get the current guest session token from cookies
 */
export function getGuestSessionToken(): string | undefined {
  return cookies().get(GUEST_SESSION_COOKIE)?.value
}

/**
 * Check if a session token is valid and not expired
 */
export async function isSessionValid(sessionToken: string): Promise<boolean> {
  try {
    const session = await db.query.sessions.findFirst({
      where: (sessions, { and, eq, gt }) => and(eq(sessions.token, sessionToken), gt(sessions.expiresAt, new Date()))
    })

    return !!session
  } catch (error) {
    console.error("Session validation error:", error)
    return false
  }
}

/**
 * Check if a guest session token is valid and not expired
 */
export async function isGuestSessionValid(sessionToken: string): Promise<boolean> {
  try {
    const guest = await db.query.guests.findFirst({
      where: (guests, { and, eq, gt }) => and(eq(guests.sessionToken, sessionToken), gt(guests.expiresAt, new Date()))
    })

    return !!guest
  } catch (error) {
    console.error("Guest session validation error:", error)
    return false
  }
}

/**
 * Clean up expired sessions
 */
export async function cleanupExpiredSessions() {
  try {
    const now = new Date()

    // Clean up expired auth sessions
    await db.delete(sessions).where((sessions, { lt }) => lt(sessions.expiresAt, now))

    // Clean up expired guest sessions
    await db.delete(guests).where((guests, { lt }) => lt(guests.expiresAt, now))

    return { success: true }
  } catch (error) {
    console.error("Cleanup expired sessions error:", error)
    return { error: "Failed to cleanup expired sessions" }
  }
}

/**
 * Get session information for debugging
 */
export async function getSessionInfo(sessionToken: string) {
  try {
    const session = await db.query.sessions.findFirst({
      where: (sessions, { eq }) => eq(sessions.token, sessionToken),
      with: {
        user: true
      }
    })

    if (!session) {
      return null
    }

    return {
      sessionId: session.id,
      userId: session.userId,
      user: session.user,
      expiresAt: session.expiresAt,
      createdAt: session.createdAt,
      isExpired: session.expiresAt < new Date()
    }
  } catch (error) {
    console.error("Get session info error:", error)
    return null
  }
}
