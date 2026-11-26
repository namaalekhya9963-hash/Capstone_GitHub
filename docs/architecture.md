# Architecture

## Overview

The repository implements a central Orchestrator with specialized custom agents. Agents communicate through Markdown artifacts and JSON workflow state.

## Components

| Component | Responsibility |
|---|---|
| SDLC Orchestrator | Enforces stage order and approvals |
| Requirements Agent | Produces requirements and unresolved questions |
| Architecture Agent | Produces architecture and technology decisions |
| Design Review Agent | Produces independent risk findings |
| Planning Agent | Produces dependency-ordered tasks |
| Implementation Agent | Changes source code within approved scope |
| Code Review Agent | Produces review findings |
| Verification Agent | Executes tests and document checks |
| PR Agent | Produces PR-ready content |

## Example Sync Flow

1. Optional provider configuration is inspected.
2. A source object is validated.
3. Markdown is normalized.
4. Output is written beneath `docs/synced/`.
5. Status is reported as success or not configured.

## Security

- Credentials come only from environment variables.
- Provider configuration is never printed or persisted.
- External URLs and fields are validated.
- Provider adapters remain optional and read-focused.
