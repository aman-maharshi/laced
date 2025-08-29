import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { users, accounts } from "@/lib/db/schema"
import { compare, hash } from "bcryptjs"
import { signUpSchema, signInSchema } from "@/lib/validations/auth"
import { v4 as uuidv4 } from "uuid"

// Simple session storage (in production, use Redis or database)
const sessions = new Map<string, { userId: string; expiresAt: Date }>()

// Cookie options
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
  maxAge: 7 * 24 * 60 * 60 // 7 days
}

// Check database connection
async function checkDatabaseConnection() {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is not set")
    }

    // Test database connection with a simple query
    await db.select().from(users).limit(1)
    return { connected: true }
  } catch (error) {
    console.error("Database connection error:", error)
    return { connected: false, error: error instanceof Error ? error.message : "Unknown database error" }
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check database connection first
    const dbCheck = await checkDatabaseConnection()
    if (!dbCheck.connected) {
      return NextResponse.json(
        {
          error: "Database connection failed",
          details: dbCheck.error
        },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { action, ...data } = body

    console.log("Auth API request:", { action, data: { ...data, password: "[REDACTED]" } })

    switch (action) {
      case "signup":
        return await handleSignUp(data)
      case "signin":
        return await handleSignIn(data)
      case "signout":
        return await handleSignOut(request)
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Auth API error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}

async function handleSignUp(data: any) {
  try {
    console.log("Processing signup for:", { ...data, password: "[REDACTED]" })

    const validatedInput = signUpSchema.parse(data)
    console.log("Validation passed for signup")

    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, validatedInput.email)
    })

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await hash(validatedInput.password, 12)
    console.log("Password hashed successfully")

    // Create user
    const [newUser] = await db
      .insert(users)
      .values({
        name: validatedInput.name,
        email: validatedInput.email,
        emailVerified: false
      })
      .returning()

    console.log("User created:", { id: newUser.id, email: newUser.email })

    // Create account record
    await db.insert(accounts).values({
      userId: newUser.id,
      accountId: validatedInput.email,
      providerId: "credentials",
      password: hashedPassword
    })

    console.log("Account record created")

    // Create session
    const sessionToken = uuidv4()
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    sessions.set(sessionToken, { userId: newUser.id, expiresAt })

    const response = NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    })

    response.cookies.set("auth_session", sessionToken, cookieOptions)
    return response
  } catch (error) {
    console.error("Sign up error:", error)
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: "Failed to create account",
          details: error.message
        },
        { status: 500 }
      )
    }
    return NextResponse.json({ error: "Failed to create account" }, { status: 500 })
  }
}

async function handleSignIn(data: any) {
  try {
    console.log("Processing signin for:", { ...data, password: "[REDACTED]" })

    const validatedInput = signInSchema.parse(data)
    console.log("Validation passed for signin")

    // Find user by email
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, validatedInput.email)
    })

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Find account with password
    const account = await db.query.accounts.findFirst({
      where: (accounts, { and, eq }) => and(eq(accounts.userId, user.id), eq(accounts.providerId, "credentials"))
    })

    if (!account?.password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Verify password
    const isValidPassword = await compare(validatedInput.password, account.password)
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    console.log("Password verified successfully for user:", user.email)

    // Create session
    const sessionToken = uuidv4()
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    sessions.set(sessionToken, { userId: user.id, expiresAt })

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })

    response.cookies.set("auth_session", sessionToken, cookieOptions)
    return response
  } catch (error) {
    console.error("Sign in error:", error)
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: "Failed to sign in",
          details: error.message
        },
        { status: 500 }
      )
    }
    return NextResponse.json({ error: "Failed to sign in" }, { status: 500 })
  }
}

async function handleSignOut(request: NextRequest) {
  const sessionToken = request.cookies.get("auth_session")?.value

  if (sessionToken) {
    sessions.delete(sessionToken)
  }

  const response = NextResponse.json({ success: true })
  response.cookies.delete("auth_session")
  return response
}

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get("auth_session")?.value

    if (!sessionToken) {
      return NextResponse.json({ user: null })
    }

    const session = sessions.get(sessionToken)
    if (!session || session.expiresAt < new Date()) {
      sessions.delete(sessionToken)
      const response = NextResponse.json({ user: null })
      response.cookies.delete("auth_session")
      return response
    }

    // Get user data
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, session.userId)
    })

    if (!user) {
      sessions.delete(sessionToken)
      const response = NextResponse.json({ user: null })
      response.cookies.delete("auth_session")
      return response
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    console.error("Get user error:", error)
    return NextResponse.json({ user: null })
  }
}
