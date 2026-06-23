---
description: Use whenever the user asks anything about OpenAI products, APIs, models, or SDKs — including factual lookups ("what is the newest model", "does X support Y"), build/coding requests ("write a script using the Responses API", "how do I use the Agents SDK"), and citation requests. Invoke before calling any openaiDeveloperDocs MCP tool.
---

# OpenAI Docs

Use the plugin-provided OpenAI Docs MCP server at `https://developers.openai.com/mcp` first for current OpenAI developer guidance.

## Workflow

1. Use the OpenAI Docs MCP tools exposed by the bundled `openaiDeveloperDocs` server.
2. Start with a compact, title-like search query of 2-6 essential terms. Do not turn the full user question into a keyword list.
3. Fetch the exact page or section needed before answering.
4. Keep the answer concise and cite the official source when the user asks for links, quotes, or precise attribution.
5. If the MCP server does not return a useful result, fall back only to official OpenAI domains such as `developers.openai.com` and `platform.openai.com`.

## Use This For

- OpenAI API concepts and examples
- Responses API and model-selection questions
- Agents SDK guidance
- ChatGPT Apps SDK guidance
- migration or upgrade questions where current docs matter

## Rules

- Treat OpenAI Docs MCP as the primary source of truth.
- Do not invent current model defaults, limits, availability, or API behavior.
- When the question is actually about building or running an API-backed artifact, hand off credential decisions to `openai-platform-api-key` before implementation work proceeds.
- Prefer concise summaries over long excerpts.
