function list(items) {
  return items.length ? items.map((item) => `- ${item}`).join("\n") : "- Not detected";
}

export function buildMarkdown(bundle) {
  const { generatedAt, title, project, privacy } = bundle;
  const runtimeLines = Object.entries(project.runtimes)
    .filter(([, value]) => value)
    .map(([name, value]) => `${name}: ${value}`);
  const git = project.git.available === false
    ? "- Git metadata was not available in this directory."
    : [
        `- Branch: ${project.git.branch ?? "detached or unavailable"}`,
        `- Commit: ${project.git.commit ?? "unavailable"}`,
        `- Changed files: ${project.git.changedFileCount}`,
        `- Untracked files present: ${project.git.hasUntrackedFiles ? "yes" : "no"}`,
      ].join("\n");
  const redactions = Object.keys(privacy.redactions).length
    ? list(Object.entries(privacy.redactions).map(([kind, count]) => `${kind}: ${count}`))
    : "- No secret-like values were found in included metadata.";

  return `# ${title}

> Generated locally by ReproKit at ${generatedAt}. No files, source code, environment values, Git remotes, or commands were uploaded.

## What happened

<!-- Describe the failure in your own words. -->

## Steps to reproduce

<!-- Add the smallest sequence of commands or interactions that triggers the problem. -->

## Expected behavior

<!-- What should have happened? -->

## Actual behavior

<!-- What happened instead? Include a sanitized error message if useful. -->

## Project snapshot

- Directory label: ${project.rootName}
- Ecosystems: ${project.ecosystems.join(", ") || "Not detected"}
- Manifests:
${list(project.manifests)}
- Lockfiles:
${list(project.lockfiles.map((file) => `${file.name} (sha256: ${file.sha256})`))}
- Available package scripts:
${list(project.scripts)}

## Runtime versions

${list(runtimeLines)}

## Git state

${git}

## Privacy review

ReproKit only included local metadata. Secret-like values were replaced before this report was written:

${redactions}

## Before you submit

- [ ] Replace the placeholder sections above with a minimal reproduction.
- [ ] Review this generated file for project-specific sensitive context.
- [ ] Attach logs only after manually checking them for secrets.
`;
}
