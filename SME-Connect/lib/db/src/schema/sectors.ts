import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const sectorsTable = pgTable("sectors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  totalSMEs: integer("total_smes").notNull().default(0),
  annualContribution: text("annual_contribution").notNull(),
  keyProducts: text("key_products").array().notNull().default([]),
  challenges: text("challenges").array().notNull().default([]),
  opportunities: text("opportunities").array().notNull().default([]),
  counties: text("counties").array().notNull().default([]),
});

export type Sector = typeof sectorsTable.$inferSelect;
