import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function read(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
}

test("docs skill routes OpenAI questions through the public Docs MCP server", () => {
  const skill = read(
    "plugins/openai-developers/skills/openai-docs/SKILL.md",
  );

  assert.match(skill, /https:\/\/developers\.openai\.com\/mcp/);
  assert.match(skill, /OpenAI Docs MCP/i);
  assert.match(skill, /official OpenAI domains/i);
});

test("routing descriptions stay sharp for overlapping developer intents", () => {
  const buildApp = read(
    "plugins/openai-developers/skills/build-chatgpt-app/SKILL.md",
  );
  const submission = read(
    "plugins/openai-developers/skills/chatgpt-app-submission/SKILL.md",
  );
  const troubleshooting = read(
    "plugins/openai-developers/skills/openai-api-troubleshooting/SKILL.md",
  );
  const apiKey = read(
    "plugins/openai-developers/skills/openai-platform-api-key/SKILL.md",
  );

  assert.match(buildApp, /explicitly wants a ChatGPT App/i);
  assert.match(buildApp, /MCP server plus widget UI/i);
  assert.match(submission, /submission import file from an MCP server/i);
  assert.match(troubleshooting, /401 invalid_api_key/i);
  assert.match(troubleshooting, /429 insufficient_quota/i);
  assert.match(apiKey, /provider-unspecified AI app/i);
  assert.match(apiKey, /requests phrased only as "using AI"/i);
  assert.match(apiKey, /credential gate/i);
});

test("API key skill uses manual local setup and does not claim automatic key creation", () => {
  const skill = read(
    "plugins/openai-developers/skills/openai-platform-api-key/SKILL.md",
  );

  assert.match(skill, /OPENAI_API_KEY/);
  assert.match(skill, /sk-proj/);
  assert.match(skill, /\.env\.local/);
  assert.match(skill, /reuse an existing key/i);
  assert.match(skill, /manual setup/i);
  assert.match(skill, /After sending the credential decision message, stop until the user answers/i);
  assert.match(skill, /do not create directories, scaffold files, draft implementation plans/i);
  assert.match(
    skill,
    /https:\/\/platform\.openai\.com\/settings\/organization\/api-keys/,
  );
  assert.match(skill, /verify/i);
  assert.match(skill, /cannot mint or retrieve OpenAI API keys automatically/i);
  assert.doesNotMatch(skill, /create_encrypted_openai_api_key/);
  assert.doesNotMatch(skill, /secure encrypted provisioning/i);
  assert.match(skill, /Never inspect credentials with commands that can print secret values/i);
});

test("troubleshooting skill classifies concrete OpenAI API failures", () => {
  const skill = read(
    "plugins/openai-developers/skills/openai-api-troubleshooting/SKILL.md",
  );

  assert.match(skill, /blocked access to api\.openai\.com/i);
  assert.match(skill, /401 invalid_api_key/i);
  assert.match(skill, /429 insufficient_quota/i);
  assert.match(skill, /429 rate_limit_exceeded/i);
  assert.match(skill, /403 model_not_found/i);
  assert.match(skill, /billing/);
  assert.match(skill, /limits/);
  assert.match(skill, /do not stop at generic "create a fresh key" advice/i);
});

test("ChatGPT Apps submission skill has import-file output contract", () => {
  const skill = read(
    "plugins/openai-developers/skills/chatgpt-app-submission/SKILL.md",
  );

  assert.match(skill, /chatgpt-app-submission\.json/);
  assert.match(skill, /positive and negative test cases/i);
  assert.match(skill, /readOnlyHint/);
  assert.match(skill, /openWorldHint/);
  assert.match(skill, /destructiveHint/);
  assert.match(skill, /outputSchema warnings/i);
  assert.match(skill, /Sensitive data solicitation/i);
  assert.match(
    skill,
    /Generate exactly five positive test cases and exactly three negative test cases\./,
  );
  assert.doesNotMatch(skill, /at least (five|three)/i);
});

test("implementation skills defer to the credential gate before API-backed work", () => {
  const files = [
    "plugins/openai-developers/skills/agents-sdk/SKILL.md",
    "plugins/openai-developers/skills/build-chatgpt-app/SKILL.md",
  ];

  for (const relativePath of files) {
    const skill = read(relativePath);
    assert.match(skill, /openai-platform-api-key/);
    assert.match(skill, /before/i);
  }
});

test("README documents install, plugin contents, and local validation", () => {
  const readme = read("README.md");

  assert.match(readme, /\/plugin marketplace add openai\/openai-developers-for-claude/);
  assert.match(readme, /\/plugin install openai-developers@openai-developers/);
  assert.match(readme, /\.claude-plugin\/marketplace\.json/);
  assert.match(readme, /plugins\/openai-developers\/\.mcp\.json/);
  assert.match(readme, /OPENAI_API_KEY/);
  assert.match(readme, /skills\/openai-docs/);
  assert.match(readme, /npm test/);
});
