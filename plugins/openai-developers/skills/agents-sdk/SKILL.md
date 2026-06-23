---
description: Use when the user wants to build, adapt, run, or evaluate an OpenAI Agents SDK app from Claude Code. Prefer a docs-first workflow and route API credential decisions through openai-platform-api-key before API-backed work.
---

# Agents SDK

Use this skill to turn an idea or repo into a focused Agents SDK implementation.

## Before You Build

1. Use `openai-docs` to inspect current Agents SDK guidance.
2. If the work will call the OpenAI API, use `openai-platform-api-key` before building, running, testing, or debugging the API-backed path.
3. Inspect the repo's existing language, package manager, entrypoints, and testing style before choosing a structure.

## Workflow

1. Define the agent contract:
   - goal
   - user input
   - expected output
   - tools
   - approval or escalation boundaries
2. Prefer the smallest runnable implementation first.
3. Use tools deliberately and keep side effects narrow.
4. Add evals when the user asks for reliability, comparison, or regression coverage.
5. Provide a local run command and a concrete smoke result when implementation is requested.

## Guidance

- Prefer Python unless the repo or user already points to TypeScript.
- Start with one agent before introducing handoffs or orchestration.
- Keep prompts, tools, tests, and deployment artifacts clearly separated.
- Use `openai-docs` again when current SDK behavior or product guidance is central to the answer.
