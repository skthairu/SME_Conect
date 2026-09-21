import { pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const partnerApplicationStatusEnum = pgEnum("partner_application_status", [
  "pending_review",
  "approved",
  "rejected",
]);

export const partnerApplicationsTable = pgTable("partner_applications", {
  id: serial("id").primaryKey(),
  organisationName: text("organisation_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  website: text("website"),
  partnershipType: text("partnership_type").notNull(),
  organisationSummary: text("organisation_summary").notNull(),
  proposedContribution: text("proposed_contribution").notNull(),
  countyOrCoverage: text("county_or_coverage").notNull(),
  status: partnerApplicationStatusEnum("status").notNull().default("pending_review"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertPartnerApplicationSchema = createInsertSchema(partnerApplicationsTable).omit({
  id: true,
  status: true,
  createdAt: true,
});

export type InsertPartnerApplication = z.infer<typeof insertPartnerApplicationSchema>;
export type PartnerApplication = typeof partnerApplicationsTable.$inferSelect;