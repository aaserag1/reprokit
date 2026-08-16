# ReproKit

**A privacy-first, maintainer-ready bug report draft from local repository metadata.**

`reprokit` turns the scattered context around a failed build into two local files: a human-editable `repro.md` and machine-readable `repro.json`. It does **not** upload data, open GitHub issues, read `.env` values, include Git remotes, include diffs, or run your application commands.

## Why this exists

Issue templates help contributors structure a report, while environment-reporting tools focus on operating-system and runtime versions. ReproKit focuses on the missing handoff: a concise, privacy-reviewed snapshot of a specific repository plus clear placeholders for the human reproduction steps.

## Quick start

```bash
npx reprokit
```

This writes a `.reprokit/` directory in the current project:

```text
.reprokit/
├── repro.md    # paste into a GitHub issue after review
└── repro.json  # structured metadata for tooling
```

Set a directory or suggested title when needed:

```bash
npx reprokit --output diagnostics --title "Build fails after dependency update"
```

## What ReproKit includes

| Category | Included | Explicitly excluded |
| --- | --- | --- |
| Project | Detected ecosystem, manifest names, lockfile SHA-256 hashes, package script names | Source-code content and manifest content |
| Runtime | Node, Python, Go and Rust version strings when available | Local binary paths |
| Git | Branch, short commit, changed-file count and untracked-file flag | Remote URL, diff, file names and commit history |
| Privacy | A summary of redaction categories | Environment variable values and `.env` values |

## Privacy model

ReproKit is intentionally conservative. It only executes version checks and read-only Git metadata commands. Before writing output, it replaces common secret shapes such as GitHub tokens, AWS access keys, JWTs, URL credentials and `token=value` style assignments. This is a safety net, not a substitute for manually reviewing a report before sharing it.

## Development

```bash
npm test
npm run check
node bin/reprokit.mjs --output .reprokit-demo
```

## Roadmap

The first release targets Node, Python, Rust and Go repositories. Future versions may add opt-in issue-template mapping, custom safe collectors, and integrations with GitHub CLI. ReproKit will keep external uploads and automatic issue creation opt-in.

## License

[MIT](LICENSE)
