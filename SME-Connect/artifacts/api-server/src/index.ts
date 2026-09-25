import app from "./app";
import { logger } from "./lib/logger";

function validateProductionConfiguration(): void {
  if (process.env.NODE_ENV === "production") {
    const required = ["DATABASE_URL", 
                     "SESSION_SECRET"];
    const missing = required.filter((name) => !process.env[name]?.trim());
    if (missing.length) {
      throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
    }
  }
}

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

validateProductionConfiguration();

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});
