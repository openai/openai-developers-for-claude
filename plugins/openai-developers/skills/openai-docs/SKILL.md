---
description: Use whenever the user asks anything about OpenAI products, APIs, models, or SDKs — including factual lookups, coding requests, latest/current/default model selection, prompting guidance, model upgrades, and citation requests. Invoke before calling any openaiDeveloperDocs MCP tool.
---

# OpenAI Docs

Use the plugin-provided OpenAI Docs MCP server at `https://developers.openai.com/mcp` first for current OpenAI developer guidance. This skill also owns model selection, API model migration, and prompt-upgrade guidance.

## API Key Setup

For requests that require a live OpenAI API call, use `openai-platform-api-key` first when available. Missing credentials block only the live call. They do not block requested source or configuration edits, documentation retrieval, or offline, mocked, static, fixture-based, or syntax validation.

Use this skill directly for docs-only questions, citations, model/API guidance, and examples that do not require a live API call.

For model migration or prompting-guidance requests, retrieve the relevant current guidance before any live-call credential check. Continue with requested source edits and offline validation when no API key is available; skip only validation that actually sends a live API request, and say that it was skipped.

## First Action for Model Requests

Before inspecting a repository or checking API credentials, classify the model target:

- **Latest/current/newest/recommended/default/flagship/unspecified target:** fetch `https://developers.openai.com/api/docs/guides/latest-model.md` through Docs MCP. Read its `latestModelInfo` block and follow the exact `migrationGuide` and `promptingGuide` URLs it provides. Do not infer those URLs or the current model.
- **Explicitly named target:** preserve that model and fetch `https://developers.openai.com/api/docs/guides/latest-model?model=<requested-model>` through Docs MCP. For example, use `?model=gpt-5.6` or `?model=gpt-5.3-codex`. Do not substitute the current model or guidance for a different model.

If a requested page is unavailable, contains only a title or no substantive body, retry the exact URL once through Docs MCP, then use a focused Docs MCP search for the same official guide. If the guide still cannot be retrieved, search only official OpenAI domains such as `developers.openai.com` and `platform.openai.com`. If that also fails, state what could not be verified and return bounded uncertainty. Never use bundled or remembered model facts as a fallback.

## Source Priority

1. Use the OpenAI Docs MCP tools exposed by the bundled `openaiDeveloperDocs` server.
2. Start general lookups with a compact, title-like search query of 2-6 essential terms. Do not turn the full user question into a keyword list.
3. Fetch the relevant page before answering. If search is noisy, run a narrower query. If a plausible official OpenAI docs URL is available, fetch it through Docs MCP before relying on search results.
4. For API reference, schema, parameter, or required-field questions, use `get_openapi_spec` when available alongside the relevant guide.
5. Use `list_openai_docs` only to browse or discover pages when there is no clear query.
6. Preserve explicit model targets even when current docs name a newer model; mention newer guidance only as optional.
7. For dynamic latest/current/default targets, treat the `latestModelInfo` migration and prompting paths as opaque. Resolve them against `https://developers.openai.com` when needed, then fetch those exact URLs directly.
8. If a prompting URL resolves to a combined model-guidance page, extract only `## Prompting Best Practices` through the next H2 heading.
9. If an exact fetch remains unhelpful, use a focused Docs MCP search for the same official page. If that also fails, return bounded uncertainty instead of guessing.

## Model Upgrade Workflow

1. Determine whether the request is model selection, a model-string upgrade, prompt-upgrade guidance, or a broader API/provider migration.
2. Retrieve the target model's current remote guidance using the routing rules above.
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

## Rules

- Treat current OpenAI docs as the source of truth; avoid speculation.
- Do not invent current model defaults, limits, availability, pricing, parameters, or API behavior.
- Keep migration changes narrow and behavior-preserving; prefer prompt-only upgrades when possible.
- Keep answers concise and cite official sources when the user requests links, quotes, or precise attribution.
- If official pages differ, call out the difference and cite both.
- Prefer concise summaries over long excerpts.
