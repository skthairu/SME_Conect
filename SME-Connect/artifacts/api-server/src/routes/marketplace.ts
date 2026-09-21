import { Router, type IRouter } from "express";
import { and, eq, ne } from "drizzle-orm";
import { z } from "zod/v4";
import { db, marketplaceSellerApplicationsTable, membersTable } from "@workspace/db";
import { verifyHumanChallenge } from "./verification";

const router: IRouter = Router();

const packages = [
  { name: "Starter", monthlyFee: 200, description: "Essential member seller profile and standard listings." },
  { name: "Growth", monthlyFee: 500, description: "More listings and improved product visibility." },
  { name: "Pro", monthlyFee: 1000, description: "Priority promotion tools for growing businesses." },
  { name: "B2B", monthlyFee: 2500, description: "Wholesale and business-to-business discovery." },
  { name: "Enterprise", monthlyFee: 5000, description: "Custom support for larger catalogues and teams." },
] as const;

const applicationSchema = z.object({
  membershipNumber: z.string().min(3),
  email: z.email(),
  phone: z.string().min(9),
  packageName: z.enum(["Starter", "Growth", "Pro", "B2B", "Enterprise"]),
  mpesaNumber: z.string().min(9),
  businessSummary: z.string().min(20).max(1000),
  verificationToken: z.string().min(10),
  verificationAnswer: z.string().min(1),
  formStartedAt: z.number(),
  website: z.string().optional().default(""),
});

router.get("/marketplace/packages", (_req, res) => {
  res.json(packages);
});

router.post("/marketplace/seller-applications", async (req, res) => {
  try {
    const parsed = applicationSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Please complete every seller application field." });
      return;
    }
    const data = parsed.data;
    if (data.website || !verifyHumanChallenge(data.verificationToken, data.verificationAnswer, data.formStartedAt)) {
      res.status(400).json({ error: "Real-user verification failed or expired. Please try again." });
      return;
    }
    const [member] = await db.select().from(membersTable).where(and(
      eq(membersTable.membershipNumber, data.membershipNumber.trim()),
      eq(membersTable.email, data.email.trim().toLowerCase()),
      eq(membersTable.phone, data.phone.trim()),
      ne(membersTable.status, "suspended"),
    )).limit(1);
    if (!member) {
      res.status(403).json({ error: "We could not match an eligible BNAK membership. Confirm your membership number, email and phone." });
      return;
    }
    const selectedPackage = packages.find((item) => item.name === data.packageName)!;
    const [application] = await db.insert(marketplaceSellerApplicationsTable).values({
      memberId: member.id,
      membershipNumber: member.membershipNumber,
      packageName: selectedPackage.name,
      monthlyFee: selectedPackage.monthlyFee,
      mpesaNumber: data.mpesaNumber.trim(),
      businessSummary: data.businessSummary.trim(),
      status: "pending_review",
      paymentStatus: "pending_verification",
    }).returning();
    res.status(202).json(application);
  } catch (error) {
    req.log.error(error);
    res.status(500).json({ error: "Failed to submit the Marketplace seller application." });
  }
});

export default router;