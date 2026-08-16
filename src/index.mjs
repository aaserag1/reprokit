import fs from "node:fs";
import path from "node:path";
import { collectProject } from "./collect.mjs";
import { redactTree } from "./redact.mjs";
import { buildMarkdown } from "./report.mjs";

export function parseArgs(args) {
  const options = { output: ".reprokit", title: "Reproduction bundle" };
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === "--output") options.output = args[++index] ?? "";
    else if (argument === "--title") options.title = args[++index] ?? "";
    else if (argument === "--help" || argument === "-h") options.help = true;
    else throw new Error(`Unknown argument: ${argument}`);
  }
  if (!options.output) throw new Error("--output requires a directory");
  if (!options.title) throw new Error("--title requires text");
  return options;
}

export function usage() {
  return `ReproKit — create a private-by-default GitHub issue draft\n\nUsage:\n  reprokit [--output <directory>] [--title <text>]\n\nThe tool never uploads data or runs application commands.`;
}

export async function run(args, cwd = process.cwd()) {
  const options = parseArgs(args);
  if (options.help) {
    console.log(usage());
    return null;
  }

  const rawBundle = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    title: options.title,
    project: collectProject(cwd),
    privacy: { policy: "metadata-only; no uploads; no environment values; no git remote or diff content" },
  };
  const redacted = redactTree(rawBundle);
  const bundle = { ...redacted.value, privacy: { ...redacted.value.privacy, redactions: redacted.totals } };
  const output = path.resolve(cwd, options.output);
  fs.mkdirSync(output, { recursive: true });
  fs.writeFileSync(path.join(output, "repro.json"), `${JSON.stringify(bundle, null, 2)}\n`);
  fs.writeFileSync(path.join(output, "repro.md"), buildMarkdown(bundle));

  console.log(`ReproKit wrote ${path.join(output, "repro.md")}`);
  console.log(`ReproKit wrote ${path.join(output, "repro.json")}`);
  console.log("No data was uploaded. Review the report before sharing it.");
  return bundle;
}
