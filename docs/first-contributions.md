# First contributions

ReproKit values small, reviewable improvements. If you are new to open source, begin with a self-contained change and ask a clarifying question in an issue before investing substantial time.

## Good first contribution ideas

| Area | Small contribution | Definition of done |
| --- | --- | --- |
| Report wording | Make a placeholder clearer for non-native English speakers | Update a Markdown-output test |
| Ecosystem detection | Add a detector for a manifest that does not require reading its contents | Add a fixture and test |
| Runtime collection | Add an opt-in-safe version command with a short timeout | Cover success and unavailable-command paths |
| Redaction | Add a narrowly scoped synthetic token pattern | Demonstrate both redaction and a non-secret value that remains visible |
| Documentation | Add one concise example from a public demo repository | Do not include real logs or credentials |

## Before opening a pull request

Run `npm test` and `npm run check`. Then generate a local report from a throwaway or public directory and verify that it contains no secret values. If your change affects output, include a synthetic sample in the pull request description.

## The privacy rule

When deciding whether to collect a field, assume that a project may be private. Prefer a filename, count, version or hash over content. If a value is not essential to diagnosing a class of problem, do not collect it.
