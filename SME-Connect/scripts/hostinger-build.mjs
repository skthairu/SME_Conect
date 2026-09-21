import { execFileSync } from "node:child_process";
import { cp, rm, mkdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

function run(command, args) {
  console.log(`\n> ${command} ${args.join(" ")}`);
  execFileSync(command, args, { cwd: root, stdio: "inherit", env: { ...process.env, NODE_ENV: "production", BASE_PATH: "/" } });
}

await rm(path.join(root, "artifacts/api-server/dist/public"), { recursive: true, force: true });
run("pnpm", ["--filter", "@workspace/kenya-smes", "build"]);
run("pnpm", ["--filter", "@workspace/api-server", "build"]);

const source = path.join(root, "artifacts/kenya-smes/dist/public");
const target = path.join(root, "artifacts/api-server/dist/public");
await mkdir(target, { recursive: true });
await cp(source, target, { recursive: true });
console.log("\nHostinger production build prepared successfully.");
