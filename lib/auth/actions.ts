"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { db } from "@/lib/db"
import { users, sessions, accounts, guests } from "@/lib/db/schema"
import { signUpSchema, signInSchema } from "@/lib/validations/auth"
import { hash, compare } from "bcryptjs"
import { v4 as uuidv4 } from "uuid"

// Cookie names
const AUTH_SESSION_COOKIE = "auth_session"
const GUEST_SESSION_COOKIE = "guest_session"

// Cookie options
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
  maxAge: 7 * 24 * 60 * 60 // 7 days
}

/**
 * Create a new user account
 */
export async function signUp(input: unknown) {
  try {
    const validatedInput = signUpSchema.parse(input)

    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, validatedInput.email)
    })

    if (existingUser) {
      return { error: "User with this email already exists" }
    }

    // Hash password
    const hashedPassword = await hash(validatedInput.password, 12)

    // Create user
    const [newUser] = await db
      .insert(users)
      .values({
        name: validatedInput.name,
        email: validatedInput.email,
        emailVerified: false
      })
      .returning()

    // Create account record
    await db.insert(accounts).values({
      userId: newUser.id,
      accountId: validatedInput.email,
      providerId: "credentials",
      password: hashedPassword
    })

    // Create session
    const sessionToken = uuidv4()
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

    await db.insert(sessions).values({
      userId: newUser.id,
      token: sessionToken,
      expiresAt
    })

    // Set auth session cookie
    cookies().set(AUTH_SESSION_COOKIE, sessionToken, cookieOptions)

    // Remove guest session if exists
    const guestSessionToken = cookies().get(GUEST_SESSION_COOKIE)?.value
    if (guestSessionToken) {
      await mergeGuestCartWithUserCart(guestSessionToken, newUser.id)
      cookies().delete(GUEST_SESSION_COOKIE)
    }

    return { success: true, user: newUser }
  } catch (error) {
    console.error("Sign up error:", error)
    return { error: "Failed to create account" }
  }
}

/**
 * Sign in existing user
 */
export async function signIn(input: unknown) {
  try {
    const validatedInput = signInSchema.parse(input)

    // Find user by email
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, validatedInput.email)
    })

    if (!user) {
      return { error: "Invalid credentials" }
    }

    // Find account with password
    const account = await db.query.accounts.findFirst({
      where: (accounts, { and, eq }) => and(eq(accounts.userId, user.id), eq(accounts.providerId, "credentials"))
    })

    if (!account?.password) {
      return { error: "Invalid credentials" }
    }

    // Verify password
    const isValidPassword = await compare(validatedInput.password, account.password)
    if (!isValidPassword) {
      return { error: "Invalid credentials" }
    }

    // Create new session
    const sessionToken = uuidv4()
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

    await db.insert(sessions).values({
      userId: user.id,
      token: sessionToken,
      expiresAt
    })

    // Set auth session cookie
    cookies().set(AUTH_SESSION_COOKIE, sessionToken, cookieOptions)

    // Remove guest session if exists
    const guestSessionToken = cookies().get(GUEST_SESSION_COOKIE)?.value
    if (guestSessionToken) {
      await mergeGuestCartWithUserCart(guestSessionToken, user.id)
      cookies().delete(GUEST_SESSION_COOKIE)
    }

    return { success: true, user }
  } catch (error) {
    console.error("Sign in error:", error)
    return { error: "Failed to sign in" }
  }
}

/**
 * Sign out user
 */
export async function signOut() {
  try {
    const sessionToken = cookies().get(AUTH_SESSION_COOKIE)?.value

    if (sessionToken) {
      // Delete session from database
      await db.delete(sessions).where((sessions, { eq }) => eq(sessions.token, sessionToken))

      // Remove auth session cookie
      cookies().delete(AUTH_SESSION_COOKIE)
    }

    return { success: true }
  } catch (error) {
    console.error("Sign out error:", error)
    return { error: "Failed to sign out" }
  }
}

/**
 * Create a new guest session
 */
export async function createGuestSession() {
  try {
    const sessionToken = uuidv4()
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

    await db.insert(guests).values({
      sessionToken,
      expiresAt
    })

    // Set guest session cookie
    cookies().set(GUEST_SESSION_COOKIE, sessionToken, cookieOptions)

    return { success: true, sessionToken }
  } catch (error) {
    console.error("Create guest session error:", error)
    return { error: "Failed to create guest session" }
  }
}

/**
 * Get or create guest session
 */
export async function guestSession() {
  try {
    let sessionToken = cookies().get(GUEST_SESSION_COOKIE)?.value

    if (!sessionToken) {
      const result = await createGuestSession()
      if (result.success) {
        sessionToken = result.sessionToken
      } else {
        return { error: "Failed to create guest session" }
      }
    }

    // Verify session is still valid
    const guest = await db.query.guests.findFirst({
      where: (guests, { and, eq, gt }) => and(eq(guests.sessionToken, sessionToken), gt(guests.expiresAt, new Date()))
    })

    if (!guest) {
      // Session expired, create new one
      cookies().delete(GUEST_SESSION_COOKIE)
      const result = await createGuestSession()
      if (result.success) {
        sessionToken = result.sessionToken
      } else {
        return { error: "Failed to create guest session" }
      }
    }

    return { success: true, sessionToken }
  } catch (error) {
    console.error("Guest session error:", error)
    return { error: "Failed to get guest session" }
  }
}

/**
 * Merge guest cart with user cart after login/signup
 */
export async function mergeGuestCartWithUserCart(guestSessionToken: string, userId: string) {
  try {
    // This is a placeholder for cart merging logic
    // In a real implementation, you would:
    // 1. Fetch guest cart items using guestSessionToken
    // 2. Fetch user cart items using userId
    // 3. Merge the carts (handle duplicates, quantities, etc.)
    // 4. Delete guest cart items
    // 5. Update user cart items

    // For now, just delete the guest session
    await db.delete(guests).where((guests, { eq }) => eq(guests.sessionToken, guestSessionToken))

    return { success: true }
  } catch (error) {
    console.error("Merge guest cart error:", error)
    return { error: "Failed to merge guest cart" }
  }
}

/**
 * Get current authenticated user
 */
export async function getCurrentUser() {
  try {
    const sessionToken = cookies().get(AUTH_SESSION_COOKIE)?.value

    if (!sessionToken) {
      return null
    }

    const session = await db.query.sessions.findFirst({
      where: (sessions, { and, eq, gt }) => and(eq(sessions.token, sessionToken), gt(sessions.expiresAt, new Date())),
      with: {
        user: true
      }
    })

    if (!session) {
      // Session expired, remove cookie
      cookies().delete(AUTH_SESSION_COOKIE)
      return null
    }

    return session.user
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
