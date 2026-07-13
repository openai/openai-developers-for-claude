---
description: Use whenever the user asks anything about OpenAI products, APIs, models, or SDKs — including factual lookups, coding requests, latest/current/default model selection, prompting guidance, model upgrades, and citation requests. Invoke before calling any openaiDeveloperDocs MCP tool.
---

# OpenAI Docs

Use the plugin-provided OpenAI Docs MCP server at `https://developers.openai.com/mcp` first for current OpenAI developer guidance. This skill also owns model selection, API model migration, and prompt-upgrade guidance.

## API Key Setup

For requests to build, run, configure, debug, or implement an API-backed artifact, use `openai-platform-api-key` before implementation when available. After that credential gate is resolved, return here for current docs as needed.

Use this skill directly for docs-only questions, citations, model/API guidance, and examples that do not require building or running an API-backed artifact.

For latest/current/default/unspecified model migration or prompting-guidance requests, complete the read-only latest-model resolver and guide fetch before the API-key credential gate. The credential gate still blocks edits, tests, and API-backed implementation until resolved; it does not block read-only retrieval of current guidance.

## First Action for Latest-Model Requests

Before inspecting a repository or checking API credentials, classify the request:

- **Latest/current prompting guidance, or change requested with a latest/current/newest/recommended/default/flagship/unspecified target:** immediately run the resolver below and inspect its JSON output. This includes changing prompts, model pickers, model references, SDK integrations, replacing an older named model with “the current model,” or asking which model to migrate to. Do not directly fetch `latest-model.md` for this branch.
- **Pure model-selection question only, with no prompting guidance or requested change:** directly fetch `https://developers.openai.com/api/docs/guides/latest-model.md`; do not run the resolver.
- **Change requested with an explicit target model:** preserve that target and do not run the resolver. For an explicit GPT-5.6 Sol or GPT-5.6-family migration, fetch the live GPT-5.6 model-guidance page and read `references/upgrading-to-gpt-5p6-sol.md` for migration judgment.
- **Prompting or migration guidance for an explicitly named GPT-5-family model:** fetch `https://developers.openai.com/api/docs/guides/model-guidance?model=<requested-model>` through Docs MCP and extract the relevant migration section or `## Prompting Best Practices` through the next H2 heading. Do not substitute latest-model guidance.

Run the resolver without relying on filesystem executable bits:

- POSIX shells: `sh <skill-dir>/scripts/resolve-latest-model-info`
- Windows: run the CommonJS implementation with Node.js 18 or newer: `node <skill-dir>\scripts\resolve-latest-model-info.cjs`

The wrapper looks for a compatible runtime in `$NODE`, `PATH`, and common system install locations. If no Node.js 18+ runtime is available, fetch `latest-model.md` through Docs MCP, read its `latestModelInfo` block, resolve the listed migration and prompting paths against `https://developers.openai.com`, and continue with those exact URLs. Use bundled static references only if that live metadata fallback also fails, and disclose the fallback.

Do not suppress or redirect resolver stdout. Success requires JSON containing `model`, `migrationGuideUrl`, and `promptingGuideUrl`. If the command exits without all three fields, run it once more before falling back.

## Source Priority

1. Use the OpenAI Docs MCP tools exposed by the bundled `openaiDeveloperDocs` server.
2. Start general lookups with a compact, title-like search query of 2-6 essential terms. Do not turn the full user question into a keyword list.
3. Fetch the relevant page before answering. If search is noisy, run a narrower query. If a plausible official OpenAI docs URL is available, fetch it through Docs MCP before relying on web search.
4. For API reference, schema, parameter, or required-field questions, use `get_openapi_spec` when available alongside the relevant guide.
5. Use `list_openai_docs` only to browse or discover pages when there is no clear query.
6. For pure latest/current/default model-selection questions, fetch `https://developers.openai.com/api/docs/guides/latest-model.md` first. If unavailable, use `references/latest-model.md`.
7. Preserve explicit targets. If the user asks for a model such as GPT-5.4, keep that target even when current docs name a newer model; mention newer guidance only as optional.
8. Treat resolver-returned migration and prompting guide URLs as opaque. Fetch those exact URLs directly; do not derive, substitute, or append a model query.
9. If a prompting URL resolves to a combined model-guidance page, extract only `## Prompting Best Practices` through the next H2 heading.
10. If a guide contains only a title or no substantive body, retry the exact markdown URL through Docs MCP or official-domain search. If that also fails, use the matching bundled reference and disclose the fallback.
11. If Docs MCP remains unhelpful, fall back only to official OpenAI domains such as `developers.openai.com` and `platform.openai.com`.

## Model Upgrade Workflow

1. Determine whether the request is model selection, a model-string upgrade, prompt-upgrade guidance, or a broader API/provider migration.
2. Prefer current remote docs whenever the user asks for latest/current/default guidance.
   - For pure selection, fetch `latest-model.md` and prefer its explicit migration or prompting links over derived URLs.
   - For dynamic prompting or upgrades, run the resolver first, then fetch both returned guide URLs exactly.
   - For explicit named targets, preserve the requested model and fetch that model's current guidance.
   - If remote retrieval fails or returns title-only content, use the bundled fallback and say so.
3. Keep upgrades behavior-preserving and scoped. Update active OpenAI API model defaults, directly related prompts, and only the registries, routing, pricing, capability, or picker surfaces placed in scope.
4. Leave historical docs, examples, eval baselines, fixtures, provider comparisons, intentionally pinned fallbacks, and ambiguous older usage unchanged unless explicitly requested. Do not collapse a multi-model router or picker into one flagship model; preserve cost, latency, and quality roles.
5. Keep SDK, tooling, IDE, plugin, shell, auth, and provider-environment migrations out of a model-and-prompt upgrade unless explicitly requested.
6. If a safe upgrade requires API-surface changes, schema rewiring, tool-handler changes, or broader implementation, make them only when that work is in scope. Otherwise report the exact blocker or smallest follow-up instead of silently changing behavior.

## Validation

For a model or prompt upgrade:

1. Inventory active model strings, aliases, defaults, prompts, routers, fallbacks, registries, capability metadata, pricing data, tests, and model-picker surfaces before editing.
2. Preserve the old effective reasoning effort when the new model's omitted default would change behavior. Do not invent model limits, prices, fields, or capabilities; verify them in current docs.
3. Run the repository's focused tests, formatting, lint, and type checks for the changed path.
4. Compare representative old and new behavior. Check output contracts, tool use, latency/cost-sensitive routes, caching, structured outputs, multimodal inputs, and downstream parsers when applicable.
5. Review the final diff for accidental changes to historical, pinned, provider-specific, or out-of-scope model usage.
6. Report what changed, what intentionally stayed pinned, the live guidance used, and any compatibility risk that still needs evaluation.

## Reference Map

Read only what the request needs:

- `https://developers.openai.com/api/docs/guides/latest-model.md` — current model selection and best/latest/current model questions.
- `references/latest-model.md` — bundled fallback for model selection.
- `references/upgrade-guide.md` — bundled routing fallback for upgrade planning.
- `references/upgrading-to-gpt-5p6-sol.md` — GPT-5.6 Sol/family migration judgment, compatibility gates, optional feature boundaries, and validation.
- `references/prompting-guide.md` — bundled GPT-5.6 prompting fallback and live Prompting Best Practices extraction contract.

## Rules

- Treat current OpenAI docs as the source of truth; avoid speculation.
- Do not invent current model defaults, limits, availability, pricing, parameters, or API behavior.
- Keep migration changes narrow and behavior-preserving; prefer prompt-only upgrades when possible.
- Keep answers concise and cite official sources when the user requests links, quotes, or precise attribution.
- If official pages differ, call out the difference and cite both.
- Prefer concise summaries over long excerpts.
