const rules = [
  ["github_token", /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/g],
  ["aws_access_key", /\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/g],
  ["jwt", /\beyJ[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}\b/g],
  ["url_credentials", /:\/\/([^\s/:@]+):([^\s@]+)@/g],
  ["secret_assignment", /\b(api[_-]?key|access[_-]?key|secret|token|password|client[_-]?secret)\s*([:=])\s*([^\s,;"']+)/gi],
  ["long_opaque_token", /\b[A-Za-z0-9]*[_-][A-Za-z0-9_-]{47,}\b/g],
];

export function redactText(value) {
  let output = String(value ?? "");
  const counts = {};

  for (const [name, pattern] of rules) {
    output = output.replace(pattern, (...match) => {
      counts[name] = (counts[name] ?? 0) + 1;
      if (name === "url_credentials") return "://[REDACTED]:[REDACTED]@";
      if (name === "secret_assignment") return `${match[1]}${match[2]}[REDACTED]`;
      return "[REDACTED]";
    });
  }

  return { value: output, counts };
}

export function redactTree(value, totals = {}) {
  if (typeof value === "string") {
    const redacted = redactText(value);
    for (const [name, count] of Object.entries(redacted.counts)) totals[name] = (totals[name] ?? 0) + count;
    return { value: redacted.value, totals };
  }
  if (Array.isArray(value)) {
    return { value: value.map((item) => redactTree(item, totals).value), totals };
  }
  if (value && typeof value === "object") {
    const output = {};
    for (const [key, item] of Object.entries(value)) output[key] = redactTree(item, totals).value;
    return { value: output, totals };
  }
  return { value, totals };
}
