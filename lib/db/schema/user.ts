import { pgTable, text, timestamp, uuid, boolean } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { sessions } from "./session"
import { accounts } from "./account"

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
})

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  accounts: many(accounts)
}))

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
