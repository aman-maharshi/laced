import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Routes that require authentication
const protectedRoutes = ["/checkout", "/account", "/orders", "/wishlist"]

// Routes that are always public
const publicRoutes = ["/", "/products", "/categories", "/cart", "/sign-in", "/sign-up"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if route requires authentication
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // Check if route is public
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

  // Get auth session cookie
  const authSession = request.cookies.get("auth_session")
  const guestSession = request.cookies.get("guest_session")

  // If accessing protected route without auth, redirect to sign-in
  if (isProtectedRoute && !authSession) {
    const signInUrl = new URL("/sign-in", request.url)
    signInUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(signInUrl)
  }

  // If accessing auth pages while already authenticated, redirect to home
  if ((pathname === "/sign-in" || pathname === "/sign-up") && authSession) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Ensure guest session exists for public routes (for cart functionality)
  if (isPublicRoute && !authSession && !guestSession) {
    const response = NextResponse.next()

    // Generate a simple guest session token (will be properly created by the app)
    const guestToken = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    response.cookies.set("guest_session", guestToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)"
  ]
}
