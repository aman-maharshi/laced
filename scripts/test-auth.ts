#!/usr/bin/env tsx

import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
import * as dotenv from "dotenv"
import { users, sessions, accounts, guests, products } from "../lib/db/schema"

// Load environment variables
dotenv.config()

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

async function testAuthSystem() {
  console.log("🧪 Testing Authentication System...")

  try {
    // Test 1: Check if tables exist
    console.log("\n1. Checking table structure...")

    const userCount = await db.select().from(users)
    console.log("✅ Users table accessible, count:", userCount.length)

    const sessionCount = await db.select().from(sessions)
    console.log("✅ Sessions table accessible, count:", sessionCount.length)

    const accountCount = await db.select().from(accounts)
    console.log("✅ Accounts table accessible, count:", accountCount.length)

    const guestCount = await db.select().from(guests)
    console.log("✅ Guests table accessible, count:", guestCount.length)

    // Test 2: Test user creation (without password for now)
    console.log("\n2. Testing user creation...")

    const testUser = await db
      .insert(users)
      .values({
        name: "Test User",
        email: "test@example.com",
        emailVerified: false
      })
      .returning()

    console.log("✅ Test user created:", testUser[0].id)

    // Test 3: Test session creation
    console.log("\n3. Testing session creation...")

    const testSession = await db
      .insert(sessions)
      .values({
        userId: testUser[0].id,
        token: "test-session-token-123",
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      })
      .returning()

    console.log("✅ Test session created:", testSession[0].id)

    // Test 4: Test account creation
    console.log("\n4. Testing account creation...")

    const testAccount = await db
      .insert(accounts)
      .values({
        userId: testUser[0].id,
        accountId: "test@example.com",
        providerId: "credentials"
      })
      .returning()

    console.log("✅ Test account created:", testAccount[0].id)

    // Test 5: Test guest session creation
    console.log("\n5. Testing guest session creation...")

    const testGuest = await db
      .insert(guests)
      .values({
        sessionToken: "test-guest-token-456",
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      })
      .returning()

    console.log("✅ Test guest session created:", testGuest[0].id)

    // Test 6: Test relationships
    console.log("\n6. Testing table relationships...")

    const userWithRelations = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, testUser[0].id),
      with: {
        sessions: true,
        accounts: true
      }
    })

    if (userWithRelations) {
      console.log("✅ User relationships working:")
      console.log("   - Sessions:", userWithRelations.sessions?.length || 0)
      console.log("   - Accounts:", userWithRelations.accounts?.length || 0)
    }

    // Cleanup test data
    console.log("\n7. Cleaning up test data...")

    await db.delete(sessions).where((sessions, { eq }) => eq(sessions.id, testSession[0].id))

    await db.delete(accounts).where((accounts, { eq }) => eq(accounts.id, testAccount[0].id))

    await db.delete(guests).where((guests, { eq }) => eq(guests.id, testGuest[0].id))

    await db.delete(users).where((users, { eq }) => eq(users.id, testUser[0].id))

    console.log("✅ Test data cleaned up")

    console.log("\n🎉 All authentication system tests passed!")
  } catch (error) {
    console.error("❌ Test failed:", error)
    process.exit(1)
  }
}

testAuthSystem()
