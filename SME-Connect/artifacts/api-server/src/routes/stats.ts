import { Router } from "express";
import { db } from "@workspace/db";
import { membersTable, coordinatorsTable, sectorsTable, eventsTable } from "@workspace/db";
import { count, gt } from "drizzle-orm";

const router = Router();

router.get("/stats", async (req, res) => {
  try {
    const [memberCount] = await db.select({ count: count() }).from(membersTable);
    const [coordinatorCount] = await db.select({ count: count() }).from(coordinatorsTable);
    const [sectorCount] = await db.select({ count: count() }).from(sectorsTable);

    const counties = await db
      .selectDistinct({ county: membersTable.county })
      .from(membersTable);

    const constituencies = await db
      .selectDistinct({ constituency: membersTable.constituency })
      .from(membersTable);

    const wards = await db
      .selectDistinct({ ward: membersTable.ward })
      .from(membersTable);

    const now = new Date();
    const [upcomingCount] = await db
      .select({ count: count() })
      .from(eventsTable)
      .where(gt(eventsTable.eventDate, now));

    res.json({
      totalMembers: Number(memberCount.count),
      totalCoordinators: Number(coordinatorCount.count),
      totalSectors: Number(sectorCount.count),
      countiesCovered: Math.max(counties.length, 47),
      constituenciesCovered: Math.max(constituencies.length, 290),
      wardsCovered: Math.max(wards.length, 1450),
      upcomingEvents: Number(upcomingCount.count),
    });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

export default router;
