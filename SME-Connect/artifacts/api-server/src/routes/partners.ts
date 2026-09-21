import { Router, type IRouter } from "express";
import { z } from "zod/v4";
import { db, insertPartnerApplicationSchema, partnerApplicationsTable } from "@workspace/db";
import { verifyHumanChallenge } from "./verification";

const router: IRouter = Router();

const partnershipTypes = [
  "Strategic Partner",
  "Programme Partner",
  "Implementing Partner",
  "Funding Partner",
  "Sponsor",
  "Technical Partner",
  "Knowledge Partner",
  "Market Partner",
] as const;

const partnerApplicationRequestSchema = insertPartnerApplicationSchema.extend({
  organisationName: z.string().trim().min(2),
  contactName: z.string().trim().min(2),
  email: z.email(),
  phone: z.string().trim().min(9),
  partnershipType: z.enum(partnershipTypes),
  organisationSummary: z.string().trim().min(20).max(1500),
  proposedContribution: z.string().trim().min(20).max(1500),
  countyOrCoverage: z.string().trim().min(2),
  website: z.string().trim().url("Enter a valid website URL").optional().or(z.literal("")),
  verificationToken: z.string().min(10),
  verificationAnswer: z.string().min(1),
  formStartedAt: z.number(),
  honeypot: z.string().optional().default(""),
});

router.post("/partners/applications", async (req, res) => {
  const parsed = partnerApplicationRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Please complete every required partner application field." });
    return;
  }

  const {
    verificationToken,
    verificationAnswer,
    formStartedAt,
    honeypot,
    website,
    ...applicationInput
  } = parsed.data;

  if (honeypot || !verifyHumanChallenge(verificationToken, verificationAnswer, formStartedAt)) {
    res.status(400).json({ error: "Real-user verification failed or expired. Please try again." });
    return;
  }

  try {
    const [application] = await db.insert(partnerApplicationsTable).values({
      ...applicationInput,
      website: website || null,
      status: "pending_review",
    }).returning();

    res.status(202).json(application);
  } catch (error) {
    req.log.error(error);
    res.status(500).json({ error: "Failed to submit the partner application." });
  }
});

export default router;