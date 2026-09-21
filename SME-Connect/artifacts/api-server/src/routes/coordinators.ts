import { Router } from "express";
import { db } from "@workspace/db";
import { coordinatorsTable, coordinatorBenefitsTable, insertCoordinatorSchema } from "@workspace/db";
import { eq, and } from "drizzle-orm";

const router = Router();

router.get("/coordinators/benefits", async (req, res) => {
  try {
    const benefits = await db.select().from(coordinatorBenefitsTable);
    res.json(benefits);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to fetch benefits" });
  }
});

router.get("/coordinators", async (req, res) => {
  try {
    const { county, constituency, limit = "20", offset = "0" } = req.query as Record<string, string>;
    const conditions = [];
    if (county) conditions.push(eq(coordinatorsTable.county, county));
    if (constituency) conditions.push(eq(coordinatorsTable.constituency, constituency));

    const results = await db
      .select()
      .from(coordinatorsTable)
      .where(conditions.length ? and(...conditions) : undefined)
      .limit(parseInt(limit))
      .offset(parseInt(offset));

    res.json(results);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to fetch coordinators" });
  }
});

router.post("/coordinators", async (req, res) => {
  try {
    const parsed = insertCoordinatorSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues });
      return;
    }

    const coordinatorCode = `COORD-${parsed.data.county.substring(0, 3).toUpperCase()}-${Date.now()}`;

    const [coordinator] = await db
      .insert(coordinatorsTable)
      .values({
        ...parsed.data,
        coordinatorCode,
        registrationFee: 500,
        status: "pending",
      })
      .returning();

    res.status(201).json(coordinator);
  } catch (err: any) {
    req.log.error(err);
    if (err.code === "23505") {
      res.status(400).json({ error: "Email or National ID already registered" });
      return;
    }
    res.status(500).json({ error: "Failed to register coordinator" });
  }
});

export default router;
