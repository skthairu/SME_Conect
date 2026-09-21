import { Router } from "express";
import { db } from "@workspace/db";
import { sectorsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/sectors", async (req, res) => {
  try {
    const sectors = await db.select().from(sectorsTable);
    res.json(sectors);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to fetch sectors" });
  }
});

router.get("/sectors/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }

    const [sector] = await db.select().from(sectorsTable).where(eq(sectorsTable.id, id));
    if (!sector) {
      res.status(404).json({ error: "Sector not found" });
      return;
    }

    res.json(sector);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to fetch sector" });
  }
});

export default router;
