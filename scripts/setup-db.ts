#!/usr/bin/env tsx

import { execSync } from "child_process"
import { config } from "dotenv"

// Load environment variables
config({ path: ".env.local" })

async function setupDatabase() {
  try {
    console.log("🚀 Setting up database...")

    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      console.error("❌ DATABASE_URL not found in .env.local")
      console.log("Please create a .env.local file with your DATABASE_URL")
      process.exit(1)
    }

    console.log("📝 Generating Drizzle migrations...")
    execSync("npm run db:generate", { stdio: "inherit" })

    console.log("🚀 Pushing schema to database...")
    execSync("npm run db:push", { stdio: "inherit" })

    console.log("🌱 Seeding database with sample data...")
    execSync("npm run db:seed", { stdio: "inherit" })

    console.log("✅ Database setup complete!")
    console.log("🎉 You can now run 'npm run dev' to start your application")
  } catch (error) {
    console.error("❌ Error setting up database:", error)
    process.exit(1)
  }
}

setupDatabase()
