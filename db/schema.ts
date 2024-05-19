import { sql } from "drizzle-orm";
import { boolean, integer, pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const products = pgTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
  category: text("category").notNull(),
  price: integer("price").notNull(),
  summary: text("summary").notNull(),
  description: text("description").default(""),
  images: text("images").default(""),
  file: text("file").default(""),
});

export const insertProductSchema = createInsertSchema(products);

export const stripeAccounts = pgTable("stripe_accounts", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  userId: text("user_id").notNull(),
  connected: text("connected").notNull(),
  test: text("test").notNull(),
});
