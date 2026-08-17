# ReproKit launch kit

This document is a checklist and writing aid, not a request for votes. Post only after the repository is public, the quick-start command has been tested from a clean machine, and the author can respond to technical questions.

## Pre-launch checklist

- [ ] Repository visibility is public and the README’s source-install path works for an unauthenticated visitor.
- [ ] The README clearly states that npm publishing is not yet available, or it contains the verified package command after publishing.
- [ ] At least one public sample directory has been used to generate and review a report.
- [ ] Issues, discussions, and a contact route are available for feedback.
- [ ] The author is available for the first 24 hours to answer questions plainly and acknowledge limitations.

## Show HN draft

**Title:** `Show HN: ReproKit – local, privacy-first repro bundles for GitHub issues`

**First comment:**

> I built ReproKit after seeing issue reports repeatedly bounce back for missing versions, lockfile state, Git state, and clear reproduction steps. It creates a local `repro.md` and `repro.json` from repository metadata, without uploads, source-code reads, `.env` values, diffs, remotes, or automatic issue creation.
>
> It is early and intentionally conservative. The interesting question for me is whether the default metadata is useful enough without being too invasive. I would especially value feedback from maintainers: what context do you usually need first, and what should never be collected by default?

Do not post this as Show HN until visitors can try the project without sign-up barriers. Do not ask anyone to upvote or comment.

## Reddit draft

Choose a relevant community only after reading its current sidebar and promotion rules. Be transparent that you are the author, lead with a question the community can answer, and tailor the post to that community rather than cross-posting identical copy.

**Draft:**

> I’m the author of a small open-source CLI called ReproKit. It creates a local issue draft with basic project, runtime, lockfile, and Git-state metadata, then redacts common token patterns before writing `repro.md` and `repro.json`. It does not upload anything or read `.env` values.
>
> I built it for the gap between “please include your environment details” and a report that is safe enough to share. For maintainers here: which pieces of context save you the most back-and-forth, and which fields would make you decline to use a tool like this? I’m looking for critical feedback, not votes.

Do not request stars or upvotes, message strangers, use alternate accounts, buy promotion, or ignore a subreddit’s individual rules.

## Follow-up plan

| Timeframe | Do | Measure |
| --- | --- | --- |
| First 24 hours | Answer every substantive question; collect confusing wording and privacy concerns | Quality of feedback, not votes |
| First week | Convert concrete feedback into small issues with scope and a privacy note | External issues, bug reproductions, contribution conversations |
| First month | Publish a changelog explaining what feedback changed and what remains intentionally out of scope | Repeat users and merged external contributions |

## Sources

- [Hacker News Show HN Guidelines](https://news.ycombinator.com/showhn.html)
- [Reddit self-promotion guidance](https://www.reddit.com/r/reddit.com/wiki/selfpromotion/)
