# Authentication Setup Guide

## Overview

This application now uses a custom authentication system built with:

- **Custom API Routes** for sign up, sign in, and sign out
- **Zustand Store** for client-side state management
- **Session-based Authentication** with secure cookies
- **Password Hashing** with bcryptjs

## Environment Variables

Create a `.env.local` file in your project root with:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@host:port/database"

# Google OAuth (optional - for future implementation)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Next.js Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key"
```

## Database Setup

1. Set up your PostgreSQL database
2. Run the database migrations:
   ```bash
   npm run db:generate
   npm run db:migrate
   npm run db:seed
   ```

## Features Implemented

✅ **User Registration** - Email/password signup
✅ **User Login** - Email/password authentication  
✅ **Session Management** - Secure cookie-based sessions
✅ **Password Security** - bcryptjs hashing
✅ **Client State** - Zustand store with persistence
✅ **Protected Routes** - Middleware-based route protection
✅ **Responsive UI** - Mobile-friendly authentication forms

## API Endpoints

- `POST /api/auth/[...better-auth]` - Handle signup, signin, signout
- `GET /api/auth/[...better-auth]` - Get current user session

## Usage Examples

### Sign Up

```typescript
const response = await fetch("/api/auth/[...better-auth]", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    action: "signup",
    name: "John Doe",
    email: "john@example.com",
    password: "password123"
  })
})
```

### Sign In

```typescript
const response = await fetch("/api/auth/[...better-auth]", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    action: "signin",
    email: "john@example.com",
    password: "password123"
  })
})
```

### Sign Out

```typescript
const response = await fetch("/api/auth/[...better-auth]", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ action: "signout" })
})
```

## Client-Side State Management

```typescript
import { authStore } from "@/app/store/authStore"

const { user, isAuthenticated, setUser, clearAuth } = authStore()

// Check authentication status
await authStore.getState().checkAuthStatus()
```

## Security Features

- **HttpOnly Cookies** - Prevents XSS attacks
- **Secure Cookies** - HTTPS-only in production
- **SameSite Strict** - CSRF protection
- **Password Hashing** - bcryptjs with 12 rounds
- **Session Expiry** - 7-day session lifetime
- **Input Validation** - Zod schema validation

## Future Enhancements

- [ ] Google OAuth integration
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Two-factor authentication
- [ ] Rate limiting
- [ ] Audit logging

## Testing

1. Start the development server: `npm run dev`
2. Navigate to `/sign-up` to create an account
3. Navigate to `/sign-in` to test login
4. Check the navbar for authentication status
5. Test protected routes and middleware
