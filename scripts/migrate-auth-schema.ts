#!/usr/bin/env tsx

import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
import { migrate } from "drizzle-orm/neon-http/migrator"
import * as dotenv from "dotenv"

// Load environment variables
dotenv.config()

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

async function main() {
  console.log("🚀 Starting authentication schema migration...")

  try {
    // This will run all pending migrations
    await migrate(db, { migrationsFolder: "./drizzle" })
    console.log("✅ Migration completed successfully!")
  } catch (error) {
    console.error("❌ Migration failed:", error)
    process.exit(1)
  }
}

main()
