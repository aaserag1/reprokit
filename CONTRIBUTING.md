# Contributing to ReproKit

Thank you for improving a safer bug-reporting workflow. ReproKit is deliberately small, so a focused change with a test can be valuable even if this is your first open-source contribution.

## First contribution in five steps

1. Pick an item from [`docs/first-contributions.md`](docs/first-contributions.md), or open an issue to describe a small improvement before coding.
2. Fork the repository and create a focused branch, such as `docs/clarify-json-output` or `fix/redact-url-credentials`.
3. Install Node.js 18 or newer, then run `npm ci`.
4. Make one clear change and add or update a test when behavior changes.
5. Open a pull request using the checklist below. Explain the privacy impact in plain language.

## Local checks

```bash
npm test
npm run check
node bin/reprokit.mjs --output .reprokit-demo
```

Inspect generated reports manually. A contribution must never add file uploads, external requests, automatic issue creation, or commands that execute a project's application scripts without an explicit future opt-in design.

## Project map

| Path | Purpose |
| --- | --- |
| `bin/reprokit.mjs` | Small executable entry point |
| `src/collect.mjs` | Safe project and runtime metadata collectors |
| `src/redact.mjs` | Secret-pattern redaction rules |
| `src/report.mjs` | Human-readable Markdown report builder |
| `test/` | Node built-in test fixtures and behavior checks |

## Changes to collectors and redaction

Add a unit test for every collector or redaction rule. Prefer collecting metadata over file content. When a value might contain sensitive context, omit it by default or redact it before serialization. Keep the privacy model visible in `README.md` when changing the output shape.

## Pull requests

Use the pull-request template and include the following information:

- The smallest description of the user-visible improvement.
- The exact local checks you ran.
- Whether any new metadata is collected, stored, redacted, or excluded.
- A synthetic before/after sample when output changes.

Do not include real access tokens, `.env` files, private remote URLs, customer data, or proprietary error logs in an issue or pull request.
