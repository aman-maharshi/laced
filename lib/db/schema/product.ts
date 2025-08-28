import { pgTable, text, timestamp, uuid, integer, decimal } from "drizzle-orm/pg-core"

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  brand: text("brand").notNull(),
  category: text("category").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  inStock: integer("in_stock").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
})

export type Product = typeof products.$inferSelect
export type NewProduct = typeof products.$inferInsert
