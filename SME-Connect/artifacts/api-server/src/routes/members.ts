import { Router } from "express";
import { db } from "@workspace/db";
import { membersTable, memberCategoriesTable, insertMemberSchema } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { verifyHumanChallenge } from "./verification";

const router = Router();

const membershipCategories = [
  {
    name: "ORDINARY MEMBER",
    description: "For informal traders and small enterprises building a stronger business network.",
    annualFee: 150,
    benefits: ["Member network access", "Business support information", "Representation in BNAK programmes"],
  },
  {
    name: "GRASSROOTS COORDINATOR",
    description: "Grassroots representatives supporting mobilisation across counties, constituencies and wards.",
    annualFee: 250,
    benefits: ["Grassroots mobilisation", "Coordinator learning opportunities", "Community representation"],
  },
  {
    name: "SENIOR COORDINATOR",
    description: "Experienced local/business leaders applying for expanded mobilisation, programme coordination and partner activation responsibilities.",
    annualFee: 500,
    benefits: [
      "Expanded mobilisation and programme coordination consideration",
      "Partner activation opportunities after approval",
      "Eligible approved coordinators may earn commissions from selected partner products or programmes, only under each partner's written terms, successful verified transactions and applicable law; no guaranteed income or fixed percentage",
    ],
  },
  {
    name: "RETAIL DEVELOPMENT MEMBER",
    description: "For retail, wholesale and distribution businesses seeking enterprise development support.",
    annualFee: 5000,
    benefits: ["Retail development opportunities", "Business connections", "Market access information"],
  },
  {
    name: "BUSINESS DEVELOPMENT MEMBER",
    description: "For established businesses, companies, manufacturers and professional enterprises.",
    annualFee: 10000,
    benefits: ["Business development opportunities", "Strategic network access", "Enterprise representation"],
  },
] as const;

async function ensureMembershipCategories() {
  const existing = await db.select().from(memberCategoriesTable);
  const byName = new Map(existing.map((category) => [category.name, category]));

  for (const category of membershipCategories) {
    const found = byName.get(category.name);
    if (found) {
      await db.update(memberCategoriesTable)
        .set({
          description: category.description,
          annualFee: category.annualFee,
          benefits: [...category.benefits],
        })
        .where(eq(memberCategoriesTable.id, found.id));
    } else {
      const [created] = await db.insert(memberCategoriesTable).values({
        name: category.name,
        description: category.description,
        annualFee: category.annualFee,
        benefits: [...category.benefits],
      }).returning();
      byName.set(category.name, created);
    }
  }

  const refreshed = await db.select().from(memberCategoriesTable);
  const refreshedByName = new Map(refreshed.map((category) => [category.name, category]));
  return membershipCategories
    .map((category) => refreshedByName.get(category.name))
    .filter((category): category is (typeof refreshed)[number] => Boolean(category));
}

router.get("/members/categories", async (req, res) => {
  try {
    const categories = await ensureMembershipCategories();
    res.json(categories);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

router.get("/members", async (req, res) => {
  try {
    const { category, county, limit = "20", offset = "0" } = req.query as Record<string, string>;

    let query = db.select().from(membersTable);
    const conditions = [];
    if (category) conditions.push(eq(membersTable.category, category));
    if (county) conditions.push(eq(membersTable.county, county));

    const results = await db
      .select()
      .from(membersTable)
      .where(conditions.length ? and(...conditions) : undefined)
      .limit(parseInt(limit))
      .offset(parseInt(offset));

    res.json(results);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to fetch members" });
  }
});

router.post("/members", async (req, res) => {
  try {
    const { verificationToken, verificationAnswer, formStartedAt, website, ...memberInput } = req.body;
    if (website || !verifyHumanChallenge(verificationToken, verificationAnswer, formStartedAt)) {
      res.status(400).json({ error: "Real-user verification failed or expired. Please try again." });
      return;
    }
    const parsed = insertMemberSchema.safeParse(memberInput);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues });
      return;
    }

    const membershipNumber = `KSME-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const [member] = await db
      .insert(membersTable)
      .values({ ...parsed.data, membershipNumber, status: "pending" })
      .returning();

    res.status(201).json(member);
  } catch (err: any) {
    req.log.error(err);
    if (err.code === "23505") {
      res.status(400).json({ error: "Email already registered" });
      return;
    }
    res.status(500).json({ error: "Failed to register member" });
  }
});

export default router;
