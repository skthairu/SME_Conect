import { pgTable, serial, text, timestamp, real, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const coordinatorStatusEnum = pgEnum("coordinator_status", ["active", "pending", "suspended"]);
export const coordinatorLevelEnum = pgEnum("coordinator_level", ["county", "constituency", "ward"]);

export const coordinatorsTable = pgTable("coordinators", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  nationalId: text("national_id").notNull().unique(),
  county: text("county").notNull(),
  constituency: text("constituency").notNull(),
  ward: text("ward").notNull(),
  level: coordinatorLevelEnum("level").notNull(),
  registrationFee: real("registration_fee").notNull().default(500),
  mpesaNumber: text("mpesa_number").notNull(),
  motivation: text("motivation"),
  status: coordinatorStatusEnum("status").notNull().default("pending"),
  coordinatorCode: text("coordinator_code").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertCoordinatorSchema = createInsertSchema(coordinatorsTable).omit({
  id: true,
  registrationFee: true,
  status: true,
  coordinatorCode: true,
  createdAt: true,
});

export type InsertCoordinator = z.infer<typeof insertCoordinatorSchema>;
export type Coordinator = typeof coordinatorsTable.$inferSelect;
