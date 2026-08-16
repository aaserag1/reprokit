# ReproKit v0.1 — Project Specification

## Promise

Generate a maintainer-ready GitHub issue draft from the current repository without uploading any repository data. The tool must collect only metadata needed to describe a reproducible problem and must show all redaction decisions in the output.

## CLI contract

```bash
npx reprokit
npx reprokit --output .reprokit
npx reprokit --title "Build fails after dependency update"
```

The command writes `repro.md` and `repro.json`. It never opens an issue, contacts GitHub, uploads a file, runs an application test command, or reads secret values from environment files.

## Collected metadata

| Area | Data | Privacy posture |
| --- | --- | --- |
| Project | Detected ecosystem, manifest names, lockfile names and hashes | Hashes and filenames only; no dependency file content |
| Runtime | Node, Python, Go and Rust versions when available | Version output only |
| Git | Branch, short commit, changed-file count and ignored state | No diff content or remote URL |
| Environment | Names of selected tooling variables only | Values are never read |
| Scripts | Script names from `package.json` | Script text is redacted before output |

## Redaction rules

Sanitize generic `key=value` pairs where the key suggests a secret, GitHub tokens, AWS access keys, JWT-like strings, URL credentials and long opaque token strings. Store only a count and category summary of sanitized items in the report.

## Non-goals for v0.1

Do not run arbitrary user commands. Do not call external APIs. Do not upload, create GitHub issues, parse source-code content or claim that a generated report proves a bug is reproducible.

## Acceptance checks

Run against a Node project, a directory without Git and a fixture containing synthetic secrets. Verify reports are generated, sensitive values are absent and the JSON is parseable.
