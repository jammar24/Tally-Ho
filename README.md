# 🦅 Tally-Ho — Autonomous Dispute Defense Engine for PayPal Sandbox

[![PayPal AI Hackathon 2026](https://img.shields.io/badge/PayPal%20AI%20Hackathon-2026-0070BA.svg?logo=paypal&logoColor=white)](https://github.com/jammar24/Tally-Ho)
[![Next.js 14](https://img.shields.io/badge/Next.js-14.2%20App%20Router-black.svg?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/Tests-16%2F16%20Passed-brightgreen.svg?logo=vitest)](https://vitest.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Repository**: [https://github.com/jammar24/Tally-Ho](https://github.com/jammar24/Tally-Ho)  
> **Author**: Jamar Masias ([@jammar24](https://github.com/jammar24))

---

## 📖 Overview

**Tally-Ho** is an autonomous, agentic dispute defense engine designed specifically for the **PayPal AI Hackathon 2026**. It connects directly to the **PayPal Sandbox Customer Disputes API (v1)** and Gemini AI to:

1. **Extract Evidence**: Read and parse merchant proof documents (carrier receipts, commercial invoices, return labels, store policies).
2. **Cross-Check Real Carrier Records**: Validate delivery timestamps, GPS coordinates, recipient signatures (FedEx, UPS, USPS, DHL).
3. **Draft Irrefutable Claims**: Synthesize multi-faceted defense packages with fact-grounded timeline mapping.
4. **Enforce Human-in-the-Loop Supervision**: No blind submissions. Merchants review, tweak, and explicitly approve claims before dispatching to PayPal Sandbox.
5. **Guarantee 100% Prompt Injection Resistance**: Zero payload execution; strict input boundary guards prevent prompt injections from malicious dispute claim notes.

---

## 🛡️ Key Features

- **Live PayPal Sandbox Lock**: Hard runtime sandbox guardrails prevent any accidental live production calls.
- **Bilingual Interface**: Full native Spanish (`ES`) and English (`EN`) support.
- **Enterprise AG Grid & Card View**: Responsive dispute tables with smooth mobile card fallbacks.
- **Multimodal AI Vision & OCR**: Inspects raw PDF text layers and images with 100% ground-truth traceability.
- **Independent Portal Architecture**: Merchant Hub, Customer Resolution Portal, and Executive Admin Dashboard open in dedicated windows (`_blank`) with isolated session controls.

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/jammar24/Tally-Ho.git
cd Tally-Ho
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env.local` file in the root directory:
```env
# PayPal Sandbox Credentials
PAYPAL_CLIENT_ID=your_sandbox_client_id
PAYPAL_CLIENT_SECRET=your_sandbox_client_secret
PAYPAL_API_BASE=https://api-m.sandbox.paypal.com

# Gemini AI Key
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Run tests
```bash
npm test
```
*(All 16 Vitest unit and integration tests must pass)*

### 5. Start the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view Tally-Ho.

---

## 🏛️ Architecture & Portals

| Portal | Route | Description |
|---|---|---|
| **Disputes Inbox** | `/disputes` | Real-time dispute dashboard with AG Grid, status filters, and one-click AI analysis. |
| **Merchant Hub** | `/merchant` | Vault for uploading delivery receipts, invoices, and managing seller evidence. |
| **Customer Portal** | `/portal` | Transparent tracking view for buyers to see verified carrier proofs. |
| **Admin Dashboard** | `/admin` | Executive KPI view with security controls and password-protected gate. |
| **Session Control** | `/auth` & `/out` | One-click PayPal Sandbox persona switcher with clean session clearance. |

---

## 🔒 Security & Guardrails

- **Sandbox API Only**: `lib/env.ts` enforces `api-m.sandbox.paypal.com` at the network transport level.
- **Role Isolation**: Admin routes cannot be bypassed via URL or client-state manipulation without the admin credential check.
- **Non-destructive**: Submitting evidence in sandbox simulates or calls real sandbox endpoints without touching production accounts.

---

## 📄 License

MIT License © 2026 Jamar Masias ([@jammar24](https://github.com/jammar24/Tally-Ho)).

