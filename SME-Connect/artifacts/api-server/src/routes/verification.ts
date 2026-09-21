import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { Router, type IRouter } from "express";

const router: IRouter = Router();
const ttlMs = 5 * 60 * 1000;

function secret() {
  return process.env.SESSION_SECRET || "development-verification-secret";
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

export function verifyHumanChallenge(token: string, answer: string, startedAt: number) {
  if (Date.now() - startedAt < 1500) return false;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return false;
  const expected = sign(encoded);
  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;
  const challenge = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as { answer: number; expiresAt: number };
  return challenge.expiresAt >= Date.now() && Number(answer) === challenge.answer;
}

router.get("/verification/challenge", (_req, res) => {
  const left = Math.floor(Math.random() * 7) + 2;
  const right = Math.floor(Math.random() * 7) + 2;
  const expiresAt = Date.now() + ttlMs;
  const encoded = Buffer.from(JSON.stringify({ answer: left + right, expiresAt, nonce: randomBytes(8).toString("hex") })).toString("base64url");
  res.json({
    token: `${encoded}.${sign(encoded)}`,
    question: `To confirm you are a real person, what is ${left} + ${right}?`,
    expiresAt: new Date(expiresAt).toISOString(),
  });
});

export default router;