import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const coordinatorBenefitsTable = pgTable("coordinator_benefits", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
});

export type CoordinatorBenefit = typeof coordinatorBenefitsTable.$inferSelect;
