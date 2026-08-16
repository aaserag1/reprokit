import test from "node:test";
import assert from "node:assert/strict";
import { redactText, redactTree } from "../src/redact.mjs";

test("redacts common secret shapes and records categories", () => {
  const value = "token=super-secret-value ghp_abcdefghijklmnopqrstuvwx1234567890 AKIA1234567890ABCDEF";
  const result = redactText(value);
  assert.ok(!result.value.includes("super-secret-value"));
  assert.ok(!result.value.includes("ghp_abcdefghijklmnopqrstuvwx1234567890"));
  assert.ok(!result.value.includes("AKIA1234567890ABCDEF"));
  assert.ok(Object.keys(result.counts).length >= 2);
});

test("redacts nested values without changing non-string metadata", () => {
  const result = redactTree({ count: 2, nested: ["password: never-share-me", "safe"] });
  assert.equal(result.value.count, 2);
  assert.equal(result.value.nested[1], "safe");
  assert.match(result.value.nested[0], /\[REDACTED\]/);
});

test("keeps a lockfile SHA-256 checksum available for dependency comparison", () => {
  const checksum = "a4a9648d7e1a19f939b93cfbaa38eb19242d419937362cc6b23fe3b9157413d8";
  assert.equal(redactText(checksum).value, checksum);
});
