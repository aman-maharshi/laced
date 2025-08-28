import { pgTable, text, timestamp, uuid, date } from "drizzle-orm/pg-core"

export const guests = pgTable("guests", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionToken: text("session_token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").notNull()
})

export type Guest = typeof guests.$inferSelect
export type NewGuest = typeof guests.$inferInsert
