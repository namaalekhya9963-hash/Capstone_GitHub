import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import {
  detectMissingConfiguration,
  markdownForSource,
  validateSource,
  writeSyncedDocument
} from "../src/sync.js";

test("normalizes a valid Jira source", () => {
  assert.deepEqual(
    validateSource({ id: "KAN-2", title: "  Sync  ", body: "Body", provider: "jira" }),
    { id: "KAN-2", title: "Sync", body: "Body", provider: "jira" }
  );
});

test("rejects missing title and missing body", () => {
  assert.throws(() => validateSource({ title: "", body: "Body" }), /title is required/i);
  assert.throws(() => validateSource({ title: "Title", body: null }), /body must be a string/i);
});

test("handles unknown provider safely", () => {
  assert.equal(validateSource({ id: "1", title: "Title", body: "", provider: "other" }).provider, "unknown");
});

test("generates Markdown and writes a file", async () => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), "sdlc-sync-"));
  const source = { id: "KAN-2", title: "Documentation Sync", body: "Requirements", provider: "jira" };
  const output = await writeSyncedDocument(directory, source);
  const content = await fs.readFile(output, "utf8");
  assert.match(content, /^# Documentation Sync$/m);
  assert.match(content, /\*\*Source:\*\* jira/);
  assert.equal(markdownForSource(source), content);
});

test("reports missing provider configuration explicitly", () => {
  assert.deepEqual(
    detectMissingConfiguration({}),
    ["Jira: Not Configured", "Confluence: Not Configured"]
  );
});
