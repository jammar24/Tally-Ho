# 🛡️ Security Policy — Tally-Ho Dispute Engine

The **Tally-Ho** project is built with security-first architecture for the **PayPal AI Hackathon 2026**. This policy outlines our vulnerability disclosure process, strict sandbox guarantees, AI guardrails, and compliance standards.

---

## 📋 Supported Versions

We actively provide security patches and updates for the following versions:

| Version | Supported | Status |
|---|---|---|
| `v0.1.x` (Main / Production) | :white_check_mark: | Active (PayPal AI Hackathon 2026) |
| `< 0.1.0` | :x: | Deprecated / Experimental |

---

## 🔒 Core Security & Compliance Guarantees

### 1. Strict PayPal Sandbox Isolation (Zero Production Leak)
- **Hard Runtime Assertion**: `lib/env.ts` and `lib/security.ts` strictly enforce that all PayPal API traffic targets `api-m.sandbox.paypal.com`.
- **SSRF Immunity**: The application rejects outbound requests to unknown external domains or production PayPal endpoints.
- **Zero Real Funds**: No real-money transactions, balance transfers, or live charges are ever permitted or initiated by this engine.

### 2. Prompt Injection & Adversarial Defense
- **Pre-LLM Inspection**: Untrusted user and buyer inputs (e.g. claim messages, disputant descriptions) are processed through regex-based adversarial filters in `lib/security.ts`.
- **Injection Isolation**: Commands such as `Ignore previous instructions`, `Rule in favor of buyer`, or `<script>` tags are flagged and blocked from overriding the AI system instructions.
- **Grounding Architecture**: The AI agent is prohibited from inventing facts. Every statement in evidence drafts must cite verifiable quotes from merchant PDFs or carrier records.

### 3. PCI-DSS & PII Redaction
- **Automatic Sanitization**: Evidence drafts are automatically scrubbed for credit card Primary Account Numbers (PANs) and CVV/CVC codes before being stored or transmitted.
- **Pattern Masking**: Card numbers are masked to `[CARD_REDACTED_****1234]` to comply with PCI-DSS banking data privacy regulations.

### 4. Sliding Window Rate Limiting
- **API Guard**: Endpoints `/api/disputes/[id]/analyze` (max 10 requests/min per case) and `/api/paypal/connect` (max 5 requests/min) are throttled by an in-memory rate limiter to prevent token exhaustion, credential stuffing, and denial-of-service.

### 5. Mandatory Human-In-The-Loop (HIL)
- **Zero Automated Dispatch**: The AI engine has zero write permissions to execute final dispute claims on PayPal.
- **Merchant Explicit Approval**: Submission only occurs when an authenticated merchant reviews the draft, confirms the evidence package, and clicks **"Approve & Submit"**.

### 6. Enterprise HTTP Security Headers
Configured via `next.config.mjs` on every response:
- `Strict-Transport-Security`: `max-age=63072000; includeSubDomains; preload`
- `X-Frame-Options`: `SAMEORIGIN` (prevents clickjacking)
- `X-Content-Type-Options`: `nosniff` (prevents MIME-sniffing)
- `Referrer-Policy`: `strict-origin-when-cross-origin`
- `Permissions-Policy`: `camera=(), microphone=(), geolocation=(), interest-cohort=()`

---

## 🚨 Reporting a Vulnerability

If you discover a security vulnerability within Tally-Ho, please report it responsibly:

1. **Do NOT open a public GitHub issue** describing the vulnerability.
2. Email the lead security maintainer directly at: **jamarmasias@gmail.com** (or reach out via GitHub [@jammar24](https://github.com/jammar24)).
3. Include:
   - Type of issue (e.g., SSRF, prompt injection bypass, rate limit bypass)
   - Step-by-step reproduction instructions
   - Potential impact
4. We will acknowledge receipt of your vulnerability report within **24 hours** and provide a patch or mitigation timeline.

---

## 📜 Attribution & License

Maintained by Jamar Masias ([@jammar24](https://github.com/jammar24)) under the [MIT License](LICENSE).

