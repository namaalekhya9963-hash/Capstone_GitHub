# Agentic SDLC Orchestrator

Reusable GitHub Copilot custom-agent framework for an approval-gated, evidence-based SDLC workflow.

The included example synchronizes Jira and Confluence documentation into Markdown in a repository. It uses read-only provider adapters, deterministic normalized output, and explicit source status reporting.

## Run

```powershell
npm start
npm test
npm run verify
```

Set `JIRA_BASE_URL`, `JIRA_USER_EMAIL`, `JIRA_API_TOKEN`, `CONFLUENCE_BASE_URL`, `CONFLUENCE_USER_EMAIL`, and `CONFLUENCE_API_TOKEN` to enable live provider reads. Missing configuration is reported as `Not Configured`; no secrets are written.

## Workflow

The orchestrator executes PLAN, ASK, and IMPLEMENT. Specialized agents communicate through `docs/*.md` and `workflow/workflow-state.json`. Each stage requires explicit approval before the next stage starts.

## Stages

1. Requirements
2. Architecture
3. Design Review
4. Implementation Planning
5. Implementation
6. Code Review
7. Verification
8. Pull Request
