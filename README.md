# OpenAI Developers Plugin for Claude Code

This plugin is the Claude Code-facing bundle for OpenAI developer workflows. It pairs the public OpenAI Docs MCP server with Claude-native skills so users can build AI applications, agents, and ChatGPT Apps from Claude Code.

## What Is Included

- `.claude-plugin/marketplace.json` declares the Claude Code plugin marketplace metadata.
- `plugins/openai-developers/.claude-plugin/plugin.json` declares the `OpenAI Developers` plugin metadata.
- `plugins/openai-developers/.mcp.json` bundles the public OpenAI Docs MCP server.
- `plugins/openai-developers/skills/openai-docs/` routes OpenAI product, API, model, and SDK questions through OpenAI documentation.
- `plugins/openai-developers/skills/openai-platform-api-key/` guides local `OPENAI_API_KEY` setup for API-backed work.
- `plugins/openai-developers/skills/openai-api-troubleshooting/` classifies common runtime API failures and routes users to the right next step.
- `plugins/openai-developers/skills/agents-sdk/` helps plan and build Agents SDK applications.
- `plugins/openai-developers/skills/build-chatgpt-app/` helps design and implement ChatGPT Apps SDK projects.
- `plugins/openai-developers/skills/chatgpt-app-submission/` prepares submission-oriented ChatGPT Apps guidance.

## Install

In the Claude app:

1. Open **Settings**, then select **Plugins**.
2. Select **Add** in the top-right corner, then choose **Add Marketplace**.
3. In the modal, select **Add from a repository**.
4. Enter `https://github.com/openai/openai-developers-for-claude`. The URL does not need a `.git` suffix.
5. Select **Sync**.
6. When **OpenAI Developers** appears, open it and select **Install**.

Alternatively, install from Claude Code:

```text
/plugin marketplace add openai/openai-developers-for-claude
/plugin install openai-developers@openai-developers
```

## Local Validation

```bash
npm test
```

## License

This project is licensed under the [Apache License 2.0](LICENSE).
