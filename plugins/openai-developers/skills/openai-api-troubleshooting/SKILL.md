---
description: Use when an OpenAI API request fails or the user asks what an error means, including blocked access to api.openai.com, 401 invalid_api_key, missing OPENAI_API_KEY, 429 insufficient_quota, 429 rate_limit_exceeded, or 403 model_not_found. Classify the failure, name the next step, route credential setup to openai-platform-api-key, and current guidance to openai-docs.
---

# OpenAI API Troubleshooting

Use this for runtime OpenAI API failures after a request has already been made. Keep key setup in `openai-platform-api-key` and current guidance in `openai-docs`.

## Routing

1. Sandboxed or blocked outbound network access
   - Treat DNS errors, connection timeouts, connection resets, or inability to reach `api.openai.com` before any API response as transport problems first.
   - If the failure came from a sandboxed or restricted run, explicitly recommend retrying the actual request with network access enabled or outside that restriction; only classify API-side auth, quota, rate-limit, or model access after a concrete OpenAI response exists.

2. Authentication or missing-key errors
   - Route `401`, `invalid_api_key`, missing `OPENAI_API_KEY`, or malformed-key cases to authentication.
   - If a key must be created or configured, explicitly hand off to `openai-platform-api-key`; do not stop at generic "create a fresh key" advice.

3. Quota or credit exhaustion
   - Treat `insufficient_quota`, "current quota", "billing quota", "run out of credits", or "no balance left" as billing/quota exhaustion, not ordinary throttling.
   - For exhausted credits, prompt the user to add credits and include [Add API credits](https://platform.openai.com/settings/organization/billing/overview). Do not purchase credits or change billing settings.
   - Link usage caps to `https://platform.openai.com/settings/organization/limits`.
   - If ambiguous, say it may be credits or a spend limit and consult `openai-docs`; when useful, note that ChatGPT subscriptions and API billing are separate.

4. Rate limits
   - Route `rate_limit_exceeded`, requests-per-minute, tokens-per-minute, or retry-after guidance without quota language to throttling.
   - Recommend pacing, batching, exponential backoff, or lower concurrency; do not suggest buying credits unless the error also indicates quota exhaustion.

5. Model, project, or organization access
   - Treat `403`, `model_not_found`, org/project mismatch, or permission failures as reached-OpenAI-but-not-authorized cases.
   - Check the model, project, organization, and key scope before guessing.

## Rules

- Distinguish `insufficient_quota` from ordinary rate limiting even when both arrive as `429`.
- Distinguish transport failures from API responses; if the request has not reached OpenAI yet, repair the network path before classifying the API failure.
- Prefer the concrete API error code and message over generic heuristics.
- Keep user-facing answers short: likely class, reason, next action.
- Do not rotate or create keys here.
- Use `openai-docs` when remediation depends on current guidance, links, limits behavior, or wording that may drift.
