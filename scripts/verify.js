import fs from "node:fs/promises";
import path from "node:path";

const requiredDocuments = [
  "docs/requirements.md",
  "docs/architecture.md",
  "docs/design-review.md",
  "docs/impl-plan.md",
  "docs/code-review.md",
  "docs/verification-report.md"
];

let failed = false;
for (const file of requiredDocuments) {
  try {
    const content = await fs.readFile(path.resolve(file), "utf8");
    if (content.trim().length === 0) throw new Error("empty document");
    console.log(`PASS ${file}`);
  } catch (error) {
    failed = true;
    console.log(`FAIL ${file}: ${error.message}`);
  }
}

if (failed) process.exitCode = 1;
