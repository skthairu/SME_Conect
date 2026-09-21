import { pgTable, serial, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const memberStatusEnum = pgEnum("member_status", ["active", "pending", "suspended"]);

export const membersTable = pgTable("members", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  businessName: text("business_name").notNull(),
  businessType: text("business_type").notNull(),
  category: text("category").notNull(),
  county: text("county").notNull(),
  constituency: text("constituency").notNull(),
  ward: text("ward").notNull(),
  ageBracket: text("age_bracket"),
  gender: text("gender"),
  nationalId: text("national_id"),
  estate: text("estate"),
  businessLocation: text("business_location"),
  businessRegistrationNumber: text("business_registration_number"),
  kraPin: text("kra_pin"),
  monthlyTransactionBracket: text("monthly_transaction_bracket"),
  mpesaNumber: text("mpesa_number"),
  kycStatus: text("kyc_status").notNull().default("pending"),
  membershipNumber: text("membership_number").notNull().unique(),
  status: memberStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertMemberSchema = createInsertSchema(membersTable).omit({
  id: true,
  membershipNumber: true,
  status: true,
  createdAt: true,
});

export type InsertMember = z.infer<typeof insertMemberSchema>;
export type Member = typeof membersTable.$inferSelect;
