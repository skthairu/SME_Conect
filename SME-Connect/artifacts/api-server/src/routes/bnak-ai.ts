import { Router, type IRouter } from "express";
import { AskBnakAiBody } from "@workspace/api-zod";
import { openai } from "@workspace/integrations-openai-ai-server";

const router: IRouter = Router();

router.post("/bnak-ai/ask", async (req, res) => {
  const parsed = AskBnakAiBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues });
    return;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-5.6-luna",
      max_completion_tokens: 1400,
      messages: [
        {
          role: "system",
          content: `You are Ask BNAK AI, a practical assistant for Kenyan micro, small and medium enterprises. Reply in ${parsed.data.language}. Be concise, actionable and grounded in Kenyan business realities. Never claim BNAK is a lender, regulator, lawyer or tax authority. Clearly distinguish general guidance from verified facts. For current taxes, licences, tenders, finance eligibility, legal requirements or government rules, tell the user to confirm with the relevant official institution such as KRA, county government, BRS, PPRA or the named provider. Do not invent official links, rates, deadlines or opportunities. End with 2-4 practical next steps.`,
        },
        { role: "user", content: parsed.data.question },
      ],
    });

    const answer = completion.choices[0]?.message?.content?.trim() || "I could not prepare guidance for that question. Please try again.";
    const institutionalTopic = /(tax|kra|licen[cs]e|permit|tender|law|legal|loan|finance|grant|county|government|import|export|customs)/i.test(parsed.data.question);

    res.json({
      answer,
      guidanceType: institutionalTopic ? "confirm-with-institution" : "general-guidance",
      confirmationNote: institutionalTopic
        ? "Confirm current requirements, rates, deadlines and eligibility with the relevant official institution."
        : "This is general business guidance. Verify decisions that create legal, tax or financial obligations.",
      suggestedActions: [
        "Write down the exact decision you need to make.",
        "Gather your business records and current figures.",
        institutionalTopic ? "Confirm the final requirement with the relevant institution." : "Choose one action to complete this week.",
      ],
    });
  } catch (error) {
    req.log.error(error);
    res.status(502).json({ error: "Ask BNAK AI is temporarily unavailable." });
  }
});

export default router;