---
description: Use when the user explicitly wants a ChatGPT App, Apps SDK project, MCP server plus widget UI, ChatGPT-compatible tool UI, or submission/deployment work for that surface. Build, scaffold, refactor, or troubleshoot those projects from Claude Code, consult openai-docs before generating code, and use openai-platform-api-key before any app path that requires live OpenAI API credentials.
---

# Build ChatGPT App

Use this skill for Apps SDK projects that combine an MCP server with a ChatGPT-facing tool or widget experience.

## Before You Build

1. Use `openai-docs` first for current Apps SDK guidance.
2. If the requested app or verification flow calls the OpenAI API, use `openai-platform-api-key` before API-backed implementation, execution, or smoke tests.
3. Inspect the target repo before choosing architecture.

## Workflow

1. Classify the app:
   - tool-only
   - widget-backed
   - submission-ready
2. Plan the tool surface before code:
   - tool names
   - input schemas
   - read/write behavior
   - annotations and expected outputs
3. Choose the smallest repo shape that fits the request.
4. Register the MCP server surface and widget resources deliberately.
5. Keep structured data, UI metadata, and side effects clear and reviewable.
6. Add local run instructions and basic verification steps when implementation is requested.

## Rules

- Prefer current OpenAI Apps SDK docs over stale examples.
- Keep tool annotations and widget metadata aligned with actual behavior.
- Treat CSP, domains, and submission-readiness as explicit design inputs when the app is meant for review or launch.
- Use `chatgpt-app-submission` when the user needs submission-specific review preparation.
