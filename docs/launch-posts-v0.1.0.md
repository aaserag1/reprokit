# ReproKit v0.1.0 — launch posts

> These are drafts only. Do not post them verbatim in multiple communities, ask for votes, or publish them before checking each community’s current rules.

## Canonical links

- Repository: https://github.com/aaserag1/reprokit
- Release: https://github.com/aaserag1/reprokit/releases/tag/v0.1.0
- npm: https://www.npmjs.com/package/@aaserag/reprokit

## Hacker News — Show HN draft

**Title**

```text
Show HN: ReproKit – local, privacy-first repro bundles for GitHub issues
```

**First comment**

```text
I built ReproKit after seeing issue reports repeatedly bounce back for missing versions, lockfile state, Git state, and reproduction steps.

It runs locally and creates a reviewable repro.md plus repro.json. It detects safe project and runtime metadata, while deliberately excluding source content, .env values, Git remotes, diffs, commit history, uploads, and automatic issue creation.

Try it:
npx @aaserag/reprokit --output .reprokit --title "Build fails after dependency update"

Release: https://github.com/aaserag1/reprokit/releases/tag/v0.1.0

This is an early beta. I would value critical feedback from maintainers: what context usually saves the most back-and-forth, and what should never be collected by default?
```

## Reddit — discussion-first draft

Choose one relevant community only after reading its sidebar and self-promotion rules. Tailor the title and first paragraph to that community.

**Suggested title**

```text
I built a local CLI for privacy-reviewed GitHub issue context — what metadata do maintainers actually need?
```

**Post body**

```text
I’m the author of ReproKit, a small open-source CLI that creates a local issue draft with basic project, runtime, lockfile, and Git-state metadata.

It writes repro.md and repro.json locally, and intentionally does not upload anything or read source code, .env values, Git remotes, diffs, or commit history. It also redacts common token patterns before writing output.

You can try it with:
npx @aaserag/reprokit --output .reprokit --title "Build fails after dependency update"

GitHub release: https://github.com/aaserag1/reprokit/releases/tag/v0.1.0

For maintainers: which pieces of diagnostic context reduce your first round of questions the most, and which fields would make you decline to use a tool like this? I’m looking for critical feedback, not votes.
```

## Post-launch response protocol

1. Identify yourself as the author when answering a question.
2. Answer concrete privacy questions with the documented default behavior; do not overstate redaction guarantees.
3. Turn repeated feedback into scoped issues with a privacy note.
4. Do not request stars, upvotes, reposts, or coordinated comments.
