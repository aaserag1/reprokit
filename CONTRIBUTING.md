# Contributing to ReproKit

Thank you for improving a safer bug-reporting workflow.

## Local checks

Use Node.js 18 or newer, then run:

```bash
npm test
npm run check
node bin/reprokit.mjs --output .reprokit-demo
```

Inspect generated reports manually. A contribution must never add file uploads, external requests, automatic issue creation, or commands that execute a project's application scripts without explicit future opt-in design.

## Changes to collectors and redaction

Add a unit test for every collector or redaction rule. Prefer collecting metadata over file content. When a value might contain sensitive context, omit it by default or redact it before serialization. Keep the privacy model visible in `README.md` when changing the output shape.

## Pull requests

Describe the privacy impact, test command and a small before/after report sample. Do not include real access tokens, `.env` files, private remote URLs or proprietary error logs in an issue or pull request.
