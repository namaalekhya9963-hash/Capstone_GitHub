import path from "node:path";
import { detectMissingConfiguration, writeSyncedDocument } from "./sync.js";

const outputDirectory = path.resolve("docs", "synced");

for (const status of detectMissingConfiguration()) {
  console.log(status);
}

const examples = [
  {
    id: "KAN-2",
    title: "Automated Documentation Sync",
    body: "Synchronize approved Jira and Confluence documentation into repository Markdown.",
    provider: "jira"
  }
];

for (const source of examples) {
  const output = await writeSyncedDocument(outputDirectory, source);
  console.log(`Generated ${path.relative(process.cwd(), output)}`);
}
