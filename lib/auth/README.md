# Authentication System

This directory contains the complete authentication system for the Nike-style e-commerce application, built with Better Auth, Drizzle ORM, and Next.js App Router.

## Architecture

### Database Schema

The authentication system uses the following PostgreSQL tables:

- **`users`** - User account information
- **`sessions`** - Active user sessions with tokens
- **`accounts`** - Authentication provider accounts (credentials, OAuth)
- **`verifications`** - Email verification and password reset tokens
- **`guests`** - Guest session management for cart functionality

### Session Management

- **Authenticated Users**: Use `auth_session` cookie with UUID tokens
- **Guest Users**: Use `guest_session` cookie with UUID tokens
- **Cookie Security**: HttpOnly, Secure, SameSite=strict, 7-day expiry

## Key Features

### 1. User Authentication

- Email/password registration and login
- Secure password hashing with bcryptjs
- Session-based authentication
- Automatic session expiry

### 2. Guest Session Support

- Anonymous users can browse and use cart
- Automatic guest session creation
- Seamless guest-to-user migration on login/signup

### 3. Route Protection

- Middleware-based route protection
- Public routes: home, products, categories, cart
- Protected routes: checkout, account, orders, wishlist

### 4. Security Features

- Input validation with Zod schemas
- SQL injection protection via Drizzle ORM
- Secure cookie handling
- Password hashing and verification

## Usage

### Server Actions

```typescript
import { signUp, signIn, signOut, getCurrentUser } from "@/lib/auth/actions"

// Sign up a new user
const result = await signUp({ name: "John Doe", email: "john@example.com", password: "password123" })

// Sign in existing user
const result = await signIn({ email: "john@example.com", password: "password123" })

// Sign out user
await signOut()

// Get current authenticated user
const user = await getCurrentUser()
```

### Client-Side Hook

```typescript
import { useAuth } from "@/lib/hooks/useAuth"

function MyComponent() {
  const { user, isAuthenticated, signIn, signOut, isLoading } = useAuth()

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.name}!</p>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={() => signIn("email", "password")}>Sign In</button>
      )}
    </div>
  )
}
```

### Route Protection

```typescript
import { requireAuth } from "@/lib/auth/actions"

export default async function ProtectedPage() {
  // This will redirect to /sign-in if not authenticated
  const user = await requireAuth()

  return <div>Protected content for {user.name}</div>
}
```

## File Structure

```
lib/
├── auth/
│   ├── actions.ts          # Server actions for auth operations
│   ├── utils.ts            # Utility functions for sessions
│   └── README.md           # This file
├── db/
│   ├── schema/
│   │   ├── user.ts         # User table schema
│   │   ├── session.ts      # Session table schema
│   │   ├── account.ts      # Account table schema
│   │   ├── verification.ts # Verification table schema
│   │   ├── guest.ts        # Guest table schema
│   │   └── index.ts        # Schema exports
│   └── index.ts            # Database connection
├── hooks/
│   └── useAuth.ts          # Client-side auth hook
├── providers/
│   └── AuthProvider.tsx    # React context provider
└── validations/
    └── auth.ts             # Zod validation schemas
```

## Database Migration

To set up the database schema:

```bash
# Generate migration files
npm run db:generate

# Apply migrations to database
npm run db:migrate

# Or push schema directly (development only)
npm run db:push
```

## Environment Variables

Required environment variables:

```env
DATABASE_URL=postgresql://username:password@host:port/database
NODE_ENV=development
```

## Security Considerations

1. **Password Security**: Passwords are hashed using bcryptjs with 12 rounds
2. **Session Security**: Sessions use cryptographically secure UUID tokens
3. **Cookie Security**: HttpOnly, Secure, SameSite=strict cookies
4. **Input Validation**: All user inputs are validated with Zod schemas
5. **SQL Injection**: Protected via Drizzle ORM parameterized queries

## Future Enhancements

- [ ] Email verification system
- [ ] OAuth provider integration (Google, Facebook, etc.)
- [ ] Two-factor authentication
- [ ] Password reset functionality
- [ ] Account deletion and data export
- [ ] Rate limiting for auth endpoints
- [ ] Audit logging for security events
