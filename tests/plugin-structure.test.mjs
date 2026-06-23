import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function read(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function readJson(relativePath) {
  return JSON.parse(read(relativePath));
}

test("marketplace and plugin manifests expose OpenAI Developers", () => {
  const marketplace = readJson(".claude-plugin/marketplace.json");
  const plugin = readJson(
    "plugins/openai-developers/.claude-plugin/plugin.json",
  );

  assert.equal(marketplace.name, "openai-developers");
  assert.equal(marketplace.owner.name, "OpenAI");
  assert.equal(marketplace.metadata.version, undefined);
  assert.equal(marketplace.plugins.length, 1);
  assert.deepEqual(marketplace.plugins[0], {
    name: "openai-developers",
    displayName: "OpenAI Developers",
    description:
      "Build with OpenAI APIs, Agents SDK, and ChatGPT Apps from Claude Code.",
    author: { name: "OpenAI" },
    homepage: "https://developers.openai.com/",
    repository: "https://github.com/openai/openai-developers-for-claude",
    source: "./plugins/openai-developers",
  });

  assert.deepEqual(plugin, {
    name: "openai-developers",
    displayName: "OpenAI Developers",
    description:
      "Build with OpenAI APIs, Agents SDK, and ChatGPT Apps from Claude Code.",
    author: { name: "OpenAI" },
    homepage: "https://developers.openai.com/",
    repository: "https://github.com/openai/openai-developers-for-claude",
  });
});

test("public release includes licensing and security policy files", () => {
  assert.ok(fs.existsSync(path.join(repoRoot, "LICENSE")));
  assert.ok(fs.existsSync(path.join(repoRoot, "SECURITY.md")));
  const license = fs.readFileSync(path.join(repoRoot, "LICENSE"), "utf8");
  assert.match(license, /Copyright \[yyyy\] \[name of copyright owner\]/);
  assert.doesNotMatch(license, /Copyright \d{4} OpenAI/);
});

test("all expected OpenAI developer skills are present", () => {
  const expected = [
    "plugins/openai-developers/skills/openai-docs/SKILL.md",
    "plugins/openai-developers/skills/openai-platform-api-key/SKILL.md",
    "plugins/openai-developers/skills/openai-api-troubleshooting/SKILL.md",
    "plugins/openai-developers/skills/agents-sdk/SKILL.md",
    "plugins/openai-developers/skills/build-chatgpt-app/SKILL.md",
    "plugins/openai-developers/skills/chatgpt-app-submission/SKILL.md",
  ];

  for (const relativePath of expected) {
    assert.ok(
      fs.existsSync(path.join(repoRoot, relativePath)),
      `${relativePath} should exist`,
    );
  }
});

test("plugin bundles the public OpenAI Docs MCP server", () => {
  const mcp = readJson("plugins/openai-developers/.mcp.json");

  assert.deepEqual(mcp, {
    mcpServers: {
      openaiDeveloperDocs: {
        type: "http",
        url: "https://developers.openai.com/mcp",
      },
    },
  });
});

test("local API key files are ignored by default", () => {
  const gitignore = read(".gitignore");

  assert.match(gitignore, /^\.env$/m);
  assert.match(gitignore, /^\.env\.\*$/m);
  assert.match(gitignore, /^!\.env\.example$/m);
});
