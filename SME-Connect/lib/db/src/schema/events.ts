import { pgTable, serial, text, timestamp, integer, boolean, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const eventTypeEnum = pgEnum("event_type", ["workshop", "conference", "training", "networking", "exhibition", "other"]);

export const eventsTable = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  eventDate: timestamp("event_date").notNull(),
  endDate: timestamp("end_date"),
  venue: text("venue").notNull(),
  county: text("county").notNull(),
  eventType: eventTypeEnum("event_type").notNull(),
  imageUrl: text("image_url"),
  registrationDeadline: timestamp("registration_deadline"),
  maxAttendees: integer("max_attendees"),
  currentAttendees: integer("current_attendees").notNull().default(0),
  isFeatured: boolean("is_featured").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const eventRegistrantsTable = pgTable("event_registrants", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id").notNull().references(() => eventsTable.id),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertEventSchema = createInsertSchema(eventsTable).omit({
  id: true,
  currentAttendees: true,
  createdAt: true,
});

export const insertEventRegistrantSchema = createInsertSchema(eventRegistrantsTable).omit({
  id: true,
  createdAt: true,
});

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof eventsTable.$inferSelect;
export type InsertEventRegistrant = z.infer<typeof insertEventRegistrantSchema>;
export type EventRegistrant = typeof eventRegistrantsTable.$inferSelect;
