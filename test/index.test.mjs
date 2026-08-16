import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { run } from "../src/index.mjs";

test("writes a reviewable markdown and JSON reproduction bundle", async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "reprokit-run-"));
  fs.writeFileSync(path.join(root, "package.json"), JSON.stringify({ name: "fixture", scripts: { test: "node --test" } }));
  await run(["--output", "bundle", "--title", "Build token=do-not-share"], root);
  const json = fs.readFileSync(path.join(root, "bundle", "repro.json"), "utf8");
  const markdown = fs.readFileSync(path.join(root, "bundle", "repro.md"), "utf8");
  assert.ok(!json.includes("do-not-share"));
  assert.match(markdown, /Steps to reproduce/);
  assert.match(markdown, /No files, source code, environment values, Git remotes, or commands were uploaded/);
  fs.rmSync(root, { recursive: true, force: true });
});
