---
description: 'Use when Claude Code is asked to build, run, test, debug, or configure an OpenAI-backed or provider-unspecified AI app, UI, script, CLI, generator, or tool, especially requests phrased only as "using AI" or generators driven by forms/user input; also use for OPENAI_API_KEY or sk-proj setup. Treat this as the credential gate: inspect safely, ask reuse-vs-new before API work, guide manual local setup when needed, verify presence, and never expose plaintext.'
---

# OpenAI API Key Setup

Use this as the credential gate for OpenAI API-backed work in Claude Code.

## When To Use

Use this skill as the credential gate for API-backed work, not as the app, docs, or implementation skill.

Use it when:

- The user asks for an OpenAI API key, `OPENAI_API_KEY`, or an `sk-proj` key.
- Claude Code will build, implement, run, test, debug, or configure an app, script, CLI, generator, UI, or tool that calls the OpenAI API, even before a live request and even if a usable key already exists.
- The user asks Claude Code to build, implement, run, or configure an app, script, CLI, generator, or tool that uses AI to produce outputs from user input.
- The user asks for an AI-powered app or UI that generates output from one or more input fields, forms, prompts, files, or other user-provided values.
- The user says "using AI" in an app/script/build request and does not name a different provider.

Do not use it when:

- The user only wants documentation, citations, model or API guidance, conceptual explanation, or code examples without asking Claude Code to build, run, configure, or debug an API-backed artifact.
- The user asks for a static frontend, visual mockup, design concept, or placeholder UI with no API-backed behavior.
- The user only asks Claude Code to write a one-off output directly and no app, script, generator, or API-backed tool is being built or run.
- The user names a different AI provider for the artifact.

If API access is needed and no usable key is found, guide the user through manual local setup instead of leaving placeholder docs or incomplete setup steps.

## Coordination With Implementation Skills

When another implementation skill also applies, run this skill first only to inspect credentials safely and send the credential decision message. Until reuse-existing-key vs create-new-key is resolved, it outranks design-first and implementation-first flows; do not design UI, choose architecture, inspect API examples, write code, or run smoke tests. After the user answers, hand off to the appropriate implementation or docs skill.

## Mandatory First Step

Before editing, testing, running, debugging, or configuring any code that calls the OpenAI API:

1. Inspect for a usable `OPENAI_API_KEY` without printing it.
2. Unless the user explicitly asked for a new key, ask whether to reuse an existing key or create a new one. If none exists, ask whether they want to create one manually.
3. Stop until the user answers.

This applies even if:

- a usable key already exists
- no live API call will be made
- no secret will be written
- the task is "just create a script"

Finding an existing key is not permission to proceed. It only changes the question you ask.

The credential decision is a hard stop. Before the user answers, do not create directories, scaffold files, draft implementation plans, wire API-dependent code, run smoke tests, or give placeholder key setup instructions. The only allowed pre-gate work is safe repo convention discovery and credential presence checks that do not print secrets.

## Credential Decision Messages

After inspecting credentials, the next user-facing message must be the credential decision message. Do not send interim user-facing messages about env files, key presence, API docs, file plans, implementation shape, or setup instructions before this decision.

Use one of these branches:

- Existing usable key found, and the user did not explicitly ask for a new key: make clear that the OpenAI API will power the app, script, or project, say that an existing usable `OPENAI_API_KEY` was found without revealing it, then ask whether to reuse that key or create a new one.
- No usable key found: make clear that the OpenAI API will power the app, script, or project, say that no usable `OPENAI_API_KEY` was found, then ask whether they want to create one manually.
- User explicitly asked for a new key: skip the reuse question and use the manual setup confirmation below.

After sending the credential decision message, stop until the user answers.

## Workflow

1. Inspect before acting:
   - look for a usable key without printing secret values in the current environment and likely local env files such as `.env.local`, `.env`, and ignored framework-specific env files
   - inspect env files only with no-output checks that reveal presence/absence, never with commands that echo matching lines or whole files
   - check README/setup docs, `OPENAI_BASE_URL`, and framework env docs for repo conventions separately from secret-bearing env files
   - prefer ignored or untracked env files; avoid tracked targets unless the user explicitly confirms that choice
   - default to `.env.local` and `OPENAI_API_KEY` when no stronger convention exists
2. Based on that inspection:
   - for tasks that will call the OpenAI API, when asking this up-front question, mention that the OpenAI API will power the app, script, or project before mentioning whether an existing key was found
   - if the user explicitly asked for a new key, no reuse decision is needed
   - otherwise, before building, implementing, running, testing, debugging, or configuring an app or script that calls the OpenAI API, ask up front whether to reuse an existing usable key or create a new one
   - if no usable key exists, ask whether they want to create one manually before building the rest of the app
   - ask this up front even before any live request; after asking, stop without adding an app plan, file list, code sketch, manual `OPENAI_API_KEY` instructions, or fallback placeholder setup
   - do not silently reuse a detected key for implementation, verification, smoke tests, or other live requests just because the user did not ask about credentials
   - treat requests to create or configure a key as ambiguous unless the user says they want a new key
   - if the user chooses reuse and a persistent file write is still needed, confirm the destination file/env var before writing
## Manual Setup

Use manual setup because this Claude Code plugin cannot mint or retrieve OpenAI API keys automatically.

1. Point the user to [Platform API keys](https://platform.openai.com/settings/organization/api-keys).
2. Ask them to place the key locally as `OPENAI_API_KEY`, defaulting to `.env.local`.
3. After they say setup is complete, verify presence with no-output checks before continuing.

## Safe Checks

- Prefer no-output existence checks such as checking whether the environment variable is set.
- For env files, only use no-output presence checks such as whether a line beginning with `OPENAI_API_KEY=` exists. Do not print file contents or matching lines.
- Inspect repo conventions separately from secret-bearing files when choosing `.env.local`, `.env`, or another ignored local env file.

## Rules

- Never print, quote, summarize, or paste a plaintext key.
- Never inspect credentials with commands that can print secret values, such as `cat .env*`, `grep OPENAI_API_KEY .env*`, or `rg OPENAI_API_KEY .env*`. Use silent exit-status checks or redacted summaries only.
- Never claim this Claude Code plugin can mint or retrieve keys automatically.
- Prefer `.env.local` unless the repo already has a better local secret convention.
- Stop at the credential decision point until the user answers.
- Verify the key is present before continuing with API-backed work.
