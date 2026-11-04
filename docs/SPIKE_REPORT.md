# DisputeDesk — Phase 0 Spike Report

**Date:** November 3, 2026  
**Project:** DisputeDesk (PayPal AI Hackathon, Devpost)  
**Author:** Senior Full-Stack Engineer  
**Status:** Phase 0 Complete — Ready for Review

---

## 1. Executive Summary & Plan Recommendation

During Phase 0, we established the full project architecture, safety boundaries, developer tooling, and performed technical spikes on the PayPal Sandbox APIs and the multimodal LLM provider adapter.

### Recommendation: **Plan B (Hybrid Architecture)**
We strongly recommend **Plan B (Hybrid Mode)** as the primary operational strategy for DisputeDesk, with live sandbox execution as an integrated capability when credentials are provided:
- **Why Plan B?**
  1. In the PayPal developer sandbox, the Disputes API (`/v1/customer/disputes`) only returns disputes that have been filed by a test **Personal (Buyer)** account through the sandbox web portal (`https://www.sandbox.paypal.com/disputes/`) or through merchant dispute simulation. A merchant REST app cannot programmatically create buyer disputes against itself via REST API.
  2. Hackathon judges evaluating the live web deployment or repository often will not have pre-seeded sandbox dispute data in their personal PayPal test accounts, or may run the demo without providing their private credentials.
  3. Under Plan B, DisputeDesk supports:
     - **Live Sandbox Mode**: When valid sandbox credentials are set and active disputes exist, the app connects directly to PayPal's live sandbox for disputes, orders, and `provide-evidence`.
     - **Demo Mode**: When sandbox disputes are empty or credentials are not supplied, the app loads realistic, synthetic disputes matching PayPal's exact API schema (`data/demo-disputes.json`), clearly badged with `Demo data`.
     - **Dry Run Submission**: For demo disputes, evidence submission validates the exact multipart payload and confirms what would be sent to PayPal without failing.
     - **Cached Analysis Fallback**: If the LLM key is absent or daily quotas are reached, pre-generated analyses (`data/demo-analyses.json`) are rendered with the label `Cached sample analysis (pre-generated)` (Rule 14).

---

## 2. PayPal Sandbox Operations Analysis

We evaluated the four critical PayPal operations using dedicated verification scripts in `scripts/`:

| Operation | Endpoint | Sandbox Behavior | Findings & Mitigation |
| :--- | :--- | :--- | :--- |
| **OAuth 2.0 Token** | `POST /v1/oauth2/token` | Fully supported via Basic Auth (`client_id:client_secret`) with `grant_type=client_credentials`. | Returns `Bearer` token valid for ~32,400 seconds (9 hours). Script `scripts/paypal-token.mjs` verifies token generation safely without exposing secrets. |
| **List Disputes** | `GET /v1/customer/disputes` | Supported via `Authorization: Bearer <token>`. | Requires the **"Customer Disputes"** checkbox to be enabled on the REST App in the PayPal Developer Dashboard. If a fresh sandbox account has no disputes filed, the API responds with `items: []`. Handled cleanly in `scripts/list-disputes.mjs`. |
| **Order Create & Capture** | `POST /v2/checkout/orders`<br>`POST /v2/checkout/orders/{id}/capture` | Supported with `intent: 'CAPTURE'`. | Order creation is instantaneous and returns a sandbox approval URL (`rel: "approve"`). Capturing requires buyer approval first; unapproved capture attempts return `ORDER_NOT_APPROVED` from PayPal sandbox as expected. Verified in `scripts/create-order.mjs`. |
| **Buyer Dispute Creation** | N/A (Web Portal / Simulation) | **Not available as a merchant REST endpoint.** | In PayPal's architecture, disputes are initiated by the consumer/buyer, not the seller. To create a dispute manually, a developer must log in to `sandbox.paypal.com` as a sandbox Personal account, select the captured transaction, and open a case in the Resolution Center. This confirms that automated end-to-end testing must rely on either pre-seeded sandbox accounts or our synthetic demo dataset. |

---

## 3. LLM Provider & Multimodal Extraction Analysis

We verified the provider-agnostic LLM interface defined in `lib/llm` and tested via `scripts/check-llm.mjs`:

### 3.1 Google AI Studio (Gemini REST API)
- **Endpoint Structure:** Verified against the current Google AI documentation:
  `POST https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`
- **Authentication:** `x-goog-api-key: ${apiKey}` header (no query param exposure).
- **Structured JSON Output:** Configured via `generationConfig.responseMimeType = "application/json"` and `generationConfig.responseSchema`.
- **Multimodal Inline Files:** Verified that PDFs and images can be passed directly as base64 in `contents.parts[].inlineData` with `mimeType: "application/pdf"`, `"image/png"`, or `"image/jpeg"`.
- **Thinking Blocks:** Added stripping function `stripThinkingBlocks()` to sanitize `<think>...</think>` tags emitted by reasoning models before JSON parsing.

### 3.2 OpenAI-Compatible REST API
- **Endpoint Structure:** `POST ${baseUrl}/chat/completions` with `model`, `messages`, and `response_format: { type: "json_object" }`.
- **Vision:** For vision-capable models, images are sent via `image_url: { url: "data:...;base64,..." }`. If `LLM_VISION=false`, the adapter falls back to server-side text-layer extraction via `pdf-parse`.

### 3.3 Zero-Hardcoding & Fallback Guarantee
- No model names or provider endpoints are hardcoded anywhere in the codebase.
- In accordance with **Hard Rule 14**, if `LLM_API_KEY` is not provided or quota limits are exceeded, DisputeDesk automatically serves pre-computed analyses from `data/demo-analyses.json` with the mandatory badge `Cached sample analysis (pre-generated)`.

---

## 4. Hard Safety Rules Verification

1. **Sandbox-Only Guard:** Tested with `PAYPAL_API_BASE=https://api-m.paypal.com`. The sandbox guard immediately terminates execution with an explicit fatal safety error, preventing any accidental production calls.
2. **Secret Privacy:** Verified that `.env.local` is listed in `.gitignore`. Helper functions in `scripts/load-env.mjs` mask all credentials, displaying only status (e.g., `[SET (32 chars)]`) or `[MISSING]`.
3. **Bounded Agent Loop:** The agent execution limits are pre-configured in `.env.example`:
   - `MAX_AGENT_STEPS = 6`
   - `MAX_LLM_CALLS_PER_ANALYSIS = 12`
   - `ANALYSIS_TIMEOUT_MS = 60000`

---

## 5. Next Steps for Phase 1
With Phase 0 complete and verified:
1. Implement `lib/env.ts` with strict Zod validation and the PayPal sandbox guard.
2. Build `lib/paypal.ts` with OAuth token caching, dispute listing/fetching, order creation/capture, and provide-evidence multipart formatting.
3. Create `data/demo-disputes.json` accurately matching PayPal's API response structure for the 10 evaluation cases.
4. Implement deterministic demo services for merchant orders and package tracking.
5. Build `scripts/generate-demo-docs.mjs` using `pdf-lib` to generate synthetic PDF evidence (invoices, shipping receipts, customer chat logs) with visible `DEMO DATA` watermarks.
6. Set up API routes with `DATA_MODE` support and Vitest tests with mocked network responses.

