import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { membersTable } from "./members";

export const marketplaceSellerApplicationsTable = pgTable("marketplace_seller_applications", {
  id: serial("id").primaryKey(),
  memberId: integer("member_id").notNull().references(() => membersTable.id),
  membershipNumber: text("membership_number").notNull(),
  packageName: text("package_name").notNull(),
  monthlyFee: integer("monthly_fee").notNull(),
  mpesaNumber: text("mpesa_number").notNull(),
  businessSummary: text("business_summary").notNull(),
  status: text("status").notNull().default("pending_review"),
  paymentStatus: text("payment_status").notNull().default("pending_verification"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const emobilityRegistrationsTable = pgTable("emobility_registrations", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  businessName: text("business_name").notNull(),
  operatorType: text("operator_type").notNull(),
  county: text("county").notNull(),
  mpesaNumber: text("mpesa_number").notNull(),
  fee: integer("fee").notNull().default(150),
  status: text("status").notNull().default("pending_payment"),
  paymentStatus: text("payment_status").notNull().default("pending_verification"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});