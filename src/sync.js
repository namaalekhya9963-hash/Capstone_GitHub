import fs from "node:fs/promises";
import path from "node:path";

export function validateSource(source) {
  if (!source || typeof source !== "object") {
    throw new TypeError("Source must be an object");
  }
  if (typeof source.title !== "string" || source.title.trim() === "") {
    throw new TypeError("Source title is required");
  }
  if (typeof source.body !== "string") {
    throw new TypeError("Source body must be a string");
  }
  return {
    id: typeof source.id === "string" ? source.id : "UNKNOWN",
    title: source.title.trim(),
    body: source.body.trim(),
    provider: source.provider === "jira" || source.provider === "confluence"
      ? source.provider
      : "unknown"
  };
}

export function markdownForSource(source) {
  const normalized = validateSource(source);
  const heading = normalized.title.replace(/[#`]/g, "").trim();
  return `# ${heading}\n\n**Source:** ${normalized.provider}\n\n**Source ID:** ${normalized.id}\n\n${normalized.body}\n`;
}

export async function writeSyncedDocument(outputDirectory, source) {
  if (!outputDirectory || typeof outputDirectory !== "string") {
    throw new TypeError("Output directory is required");
  }
  await fs.mkdir(outputDirectory, { recursive: true });
  const normalized = validateSource(source);
  const safeName = `${normalized.provider}-${normalized.id}`
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "") || "unknown-document";
  const outputPath = path.join(outputDirectory, `${safeName}.md`);
  await fs.writeFile(outputPath, markdownForSource(normalized), "utf8");
  return outputPath;
}

export function detectMissingConfiguration(environment = process.env) {
  const providers = [];
  if (!environment.JIRA_BASE_URL || !environment.JIRA_USER_EMAIL || !environment.JIRA_API_TOKEN) {
    providers.push("Jira: Not Configured");
  } else {
    providers.push("Jira: Configured");
  }
  if (!environment.CONFLUENCE_BASE_URL || !environment.CONFLUENCE_USER_EMAIL || !environment.CONFLUENCE_API_TOKEN) {
    providers.push("Confluence: Not Configured");
  } else {
    providers.push("Confluence: Configured");
  }
  return providers;
}
