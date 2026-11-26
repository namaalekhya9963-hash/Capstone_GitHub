# Design Review

## Findings

| Severity | Finding | Decision |
|---|---|---|
| High | Credentials could accidentally enter logs or files | Environment-only configuration and secret-free status reporting |
| High | External provider outages could appear as successful sync | Explicit configured/not-configured/error status |
| Medium | Source fields may be missing | Reject missing titles and non-string bodies |
| Medium | Unknown provider content could be misclassified | Normalize unknown providers safely |
| Medium | Workflow state could drift | Use one JSON state file with stage approval fields |

## Approved Design Decisions

- Provider calls remain optional; examples run offline.
- The sync implementation does not execute external content.
- Each stage artifact is a human-readable approval boundary.
- No Git write, push, PR, or merge is automatic.
