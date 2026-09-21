import { pgTable, serial, text, real } from "drizzle-orm/pg-core";

export const memberCategoriesTable = pgTable("member_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  annualFee: real("annual_fee").notNull(),
  benefits: text("benefits").array().notNull().default([]),
});

export type MemberCategory = typeof memberCategoriesTable.$inferSelect;
