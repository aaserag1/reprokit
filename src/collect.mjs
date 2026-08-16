import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const ecosystems = [
  ["node", "package.json"],
  ["python", "pyproject.toml"],
  ["python", "requirements.txt"],
  ["rust", "Cargo.toml"],
  ["go", "go.mod"],
];

const lockfiles = ["package-lock.json", "pnpm-lock.yaml", "yarn.lock", "bun.lockb", "poetry.lock", "Cargo.lock", "go.sum"];

function exists(file) {
  return fs.existsSync(file);
}

function command(commandName, args, cwd) {
  const result = spawnSync(commandName, args, { cwd, encoding: "utf8", timeout: 2500, windowsHide: true });
  if (result.error || result.status !== 0) return null;
  return result.stdout.trim() || result.stderr.trim() || null;
}

function sha256(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

function readPackageScripts(root) {
  const file = path.join(root, "package.json");
  if (!exists(file)) return [];
  try {
    const manifest = JSON.parse(fs.readFileSync(file, "utf8"));
    return Object.keys(manifest.scripts ?? {}).sort();
  } catch {
    return [];
  }
}

export function collectProject(root) {
  const detected = ecosystems.filter(([, file]) => exists(path.join(root, file)));
  const manifests = [...new Set(detected.map(([, file]) => file))];
  const lockfileData = lockfiles
    .filter((file) => exists(path.join(root, file)))
    .map((file) => ({ name: file, sha256: sha256(path.join(root, file)) }));

  const insideGit = command("git", ["rev-parse", "--is-inside-work-tree"], root) === "true";
  const status = insideGit ? command("git", ["status", "--porcelain"], root) ?? "" : "";

  return {
    rootName: path.basename(path.resolve(root)),
    ecosystems: [...new Set(detected.map(([name]) => name))],
    manifests,
    lockfiles: lockfileData,
    scripts: readPackageScripts(root),
    runtimes: {
      node: command("node", ["--version"], root),
      python: command("python", ["--version"], root) ?? command("python3", ["--version"], root),
      go: command("go", ["version"], root),
      rust: command("rustc", ["--version"], root),
    },
    git: insideGit
      ? {
          branch: command("git", ["branch", "--show-current"], root),
          commit: command("git", ["rev-parse", "--short", "HEAD"], root),
          changedFileCount: status ? status.split("\n").filter(Boolean).length : 0,
          hasUntrackedFiles: status.split("\n").some((line) => line.startsWith("??")),
        }
      : { available: false },
  };
}
