import { Router } from "express";
import { db } from "@workspace/db";
import { eventsTable, eventRegistrantsTable, insertEventSchema, insertEventRegistrantSchema } from "@workspace/db";
import { eq, gt, sql } from "drizzle-orm";

const router = Router();

router.get("/events", async (req, res) => {
  try {
    const { upcoming, limit = "10" } = req.query as Record<string, string>;
    const now = new Date();

    let results;
    if (upcoming === "true") {
      results = await db
        .select()
        .from(eventsTable)
        .where(gt(eventsTable.eventDate, now))
        .limit(parseInt(limit))
        .orderBy(eventsTable.eventDate);
    } else {
      results = await db
        .select()
        .from(eventsTable)
        .limit(parseInt(limit))
        .orderBy(eventsTable.eventDate);
    }

    res.json(results);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

router.post("/events", async (req, res) => {
  try {
    const parsed = insertEventSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues });
      return;
    }

    const [event] = await db
      .insert(eventsTable)
      .values({ ...parsed.data, currentAttendees: 0 })
      .returning();

    res.status(201).json(event);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to create event" });
  }
});

router.post("/events/:id/register", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid event id" });
      return;
    }

    const [event] = await db.select().from(eventsTable).where(eq(eventsTable.id, id));
    if (!event) {
      res.status(404).json({ error: "Event not found" });
      return;
    }

    const parsed = insertEventRegistrantSchema.safeParse({ ...req.body, eventId: id });
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues });
      return;
    }

    const [registrant] = await db
      .insert(eventRegistrantsTable)
      .values(parsed.data)
      .returning();

    await db
      .update(eventsTable)
      .set({ currentAttendees: sql`${eventsTable.currentAttendees} + 1` })
      .where(eq(eventsTable.id, id));

    res.status(201).json(registrant);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to register for event" });
  }
});

export default router;
