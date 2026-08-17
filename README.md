# ReproKit

[![License: MIT](https://img.shields.io/github/license/aaserag1/reprokit?style=flat)](LICENSE)
[![Node.js 18+](https://img.shields.io/badge/node-%3E%3D18-5FA04E?style=flat&logo=nodedotjs&logoColor=white)](package.json)
[![Privacy: local only](https://img.shields.io/badge/privacy-local%20only-2E7D5B?style=flat&logo=shield&logoColor=white)](#privacy-model)
[![Status: beta](https://img.shields.io/badge/status-beta-F7B955?style=flat)](#status)

**A privacy-first, maintainer-ready bug report draft from local repository metadata.**

`reprokit` turns scattered context around a failed build into two local files: a human-editable `repro.md` and machine-readable `repro.json`. It does **not** upload data, open GitHub issues, read `.env` values, include Git remotes, include diffs, or run your application commands.

> **The promise:** make the first maintainer reply less likely to be “Can you share your environment, lockfile state, Git state, and reproduction steps?”—without sending source code or secrets anywhere.

## Status

ReproKit is an early beta. The preferred path after the first npm release is:

```bash
npx @aaserag/reprokit --output .reprokit --title "Build fails after dependency update"
```

Until that release is visible on npm, use the source-install path below.

## Contents

- [Try it from source](#try-it-from-source)
- [What it writes](#what-it-writes)
- [What ReproKit includes](#what-reprokit-includes)
- [Privacy model](#privacy-model)
- [Development](#development)
- [Contributing](#contributing)

## Why this exists

Issue templates help contributors structure a report, while environment-reporting tools focus on operating-system and runtime versions. ReproKit focuses on the missing handoff: a concise, privacy-reviewed snapshot of a specific repository plus clear placeholders for the human reproduction steps.

## Try it from source

```bash
git clone https://github.com/aaserag1/reprokit.git
cd reprokit
npm ci
node bin/reprokit.mjs --output .reprokit-demo --title "Build fails after dependency update"
```

To run the CLI against **another** project, use the local executable from that project directory:

```bash
node /path/to/reprokit/bin/reprokit.mjs --output .reprokit --title "Describe the failure briefly"
```

This writes a report directory:

```text
.reprokit/
├── repro.md    # paste into a GitHub issue after review
└── repro.json  # structured metadata for tooling
```

## What it writes

`repro.md` is a ready-to-edit GitHub issue draft. It contains clearly marked placeholders for the human parts of a useful report: what happened, the smallest reproduction, expected behavior, and actual behavior. `repro.json` carries the same safe metadata for tooling.

```md
# Build fails after dependency update

## Steps to reproduce
<!-- Add the smallest sequence of commands or interactions that triggers the problem. -->

## Project snapshot
- Ecosystems: node
- Lockfiles:
- package-lock.json (sha256: ...)
```

Before sharing either file, review it yourself. ReproKit reduces risk; it cannot know every private detail in your project.

## What it does not do

| It does | It does not do |
| --- | --- |
| Detect ecosystem files, lockfile hashes, runtime versions and compact Git state | Read source-code content, manifest content, `.env` values, Git remotes, diffs or commit history |
| Write `repro.md` and `repro.json` locally | Upload a report, create an issue, contact an API or run project test/build scripts |
| Redact common token patterns before serializing output | Guarantee that a report contains no sensitive context; human review remains mandatory |

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
npm ci
npm test
npm run check
node bin/reprokit.mjs --output .reprokit-demo
```

### Continuous integration

A ready-to-use GitHub Actions workflow lives at [`docs/github-actions-test.yml`](docs/github-actions-test.yml). Copy it to `.github/workflows/test.yml` after the repository token or account has permission to create workflow files. The workflow runs the unit tests and syntax checks on Node.js 18, 20 and 22.

## Contributing

New contributors are welcome, especially for ecosystem detectors, redaction rules, report wording, test fixtures, and accessibility/readability improvements in the generated Markdown. Start with [the first-contribution guide](docs/first-contributions.md), then read [CONTRIBUTING.md](CONTRIBUTING.md) and the [security policy](SECURITY.md).

## Roadmap

The first release targets Node, Python, Rust and Go repositories. Future versions may add opt-in issue-template mapping, custom safe collectors, and integrations with GitHub CLI. ReproKit will keep external uploads and automatic issue creation opt-in.

## License

[MIT](LICENSE)
