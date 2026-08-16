import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { collectProject } from "../src/collect.mjs";

test("detects a Node project and lists script names without script content", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "reprokit-"));
  fs.writeFileSync(path.join(root, "package.json"), JSON.stringify({ scripts: { test: "node --test", build: "TOKEN=never-share vite build" } }));
  fs.writeFileSync(path.join(root, "package-lock.json"), "{\"lockfileVersion\":3}");
  const project = collectProject(root);
  assert.deepEqual(project.ecosystems, ["node"]);
  assert.deepEqual(project.scripts, ["build", "test"]);
  assert.equal(project.lockfiles[0].name, "package-lock.json");
  assert.equal(project.git.available, false);
  fs.rmSync(root, { recursive: true, force: true });
});
