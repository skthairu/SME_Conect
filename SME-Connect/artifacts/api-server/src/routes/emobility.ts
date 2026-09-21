import { Router, type IRouter } from "express";
import { z } from "zod/v4";
import { db, emobilityRegistrationsTable } from "@workspace/db";
import { verifyHumanChallenge } from "./verification";

const router: IRouter = Router();

const registrationSchema = z.object({
  fullName: z.string().min(2),
  email: z.email(),
  phone: z.string().min(9),
  businessName: z.string().min(2),
  operatorType: z.string().min(2),
  county: z.string().min(2),
  mpesaNumber: z.string().min(9),
  verificationToken: z.string().min(10),
  verificationAnswer: z.string().min(1),
  formStartedAt: z.number(),
  website: z.string().optional().default(""),
});

router.post("/emobility/registrations", async (req, res) => {
  try {
    const parsed = registrationSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Please complete every E-Mobility registration field." });
      return;
    }
    const data = parsed.data;
    if (data.website || !verifyHumanChallenge(data.verificationToken, data.verificationAnswer, data.formStartedAt)) {
      res.status(400).json({ error: "Real-user verification failed or expired. Please try again." });
      return;
    }
    const [registration] = await db.insert(emobilityRegistrationsTable).values({
      fullName: data.fullName.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      businessName: data.businessName.trim(),
      operatorType: data.operatorType,
      county: data.county.trim(),
      mpesaNumber: data.mpesaNumber.trim(),
      fee: 150,
      status: "pending_payment",
      paymentStatus: "pending_verification",
    }).returning();
    res.status(202).json(registration);
  } catch (error) {
    req.log.error(error);
    res.status(500).json({ error: "Failed to submit E-Mobility registration." });
  }
});

export default router;