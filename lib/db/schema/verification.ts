import { pgTable, text, timestamp, uuid, date } from "drizzle-orm/pg-core"

export const verifications = pgTable("verifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
})

export type Verification = typeof verifications.$inferSelect
export type NewVerification = typeof verifications.$inferInsert
