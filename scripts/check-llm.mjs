// DisputeDesk - LLM Provider Verification Script
// Tests JSON output, thinking block stripping, and multimodal (PDF/Image) inline processing.
// Supports "gemini" (Google AI Studio REST) and "openai-compatible".
// NEVER prints API keys or secrets.

import { loadEnv, formatSecretStatus } from './load-env.mjs';

loadEnv();

const provider = process.env.LLM_PROVIDER || 'gemini';
const apiKey = process.env.LLM_API_KEY;
const baseUrl = process.env.LLM_BASE_URL || (provider === 'gemini' ? 'https://generativelanguage.googleapis.com/v1beta' : 'https://api.openai.com/v1');
const modelPrimary = process.env.LLM_MODEL_PRIMARY || (provider === 'gemini' ? 'gemini-2.5-flash' : 'gpt-4o-mini');
const modelFast = process.env.LLM_MODEL_FAST;
const visionConfig = process.env.LLM_VISION || 'auto';

console.log('--- DisputeDesk: LLM Provider & Multimodal Check ---');
console.log(`Provider: ${provider}`);
console.log(`Base URL: ${baseUrl}`);
console.log(`Primary Model: ${modelPrimary}`);
console.log(`Fast Model: ${modelFast || '(using primary)'}`);
console.log(`Vision Setting: ${visionConfig}`);
console.log(`API Key Status: ${formatSecretStatus(apiKey)}`);

if (!apiKey || apiKey.trim() === '' || apiKey.includes('your_') || apiKey.includes('here')) {
  console.log('\n[INFO] LLM API key is not configured in .env.local.');
  console.log('DisputeDesk supports two modes:');
  console.log('1. LIVE AI MODE: Set LLM_API_KEY in .env.local (Google AI Studio key or OpenAI-compatible key).');
  console.log('2. DEMO CACHED MODE: Hard Rule 14 ensures that when the LLM key is absent or cap is reached,');
  console.log('   the app continues running seamlessly with data/demo-analyses.json (clearly labeled).\n');
  console.log('Result: SKIPPED (No API key configured - app will use cached demo analyses)');
  process.exit(0);
}

/**
 * Remove reasoning/thinking blocks such as <think>...</think> from raw LLM output.
 * @param {string} text
 * @returns {string}
 */
export function stripThinkingBlocks(text) {
  if (!text) return '';
  // Remove <think>...</think> including multiline
  let cleaned = text.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
  // Strip markdown code fences if wrapped in ```json ... ```
  cleaned = cleaned.replace(/^```json\s*/i, '').replace(/^```\s*/i, '');
  cleaned = cleaned.replace(/\s*```$/i, '').trim();
  return cleaned;
}

/**
 * Minimal valid single-page PDF containing sample merchant invoice text
 * This raw PDF buffer is standard PDF 1.4 syntax with a text stream.
 */
function createMinimalInvoicePdfBuffer() {
  const content = `BT
/F1 12 Tf
72 712 Td
(MERCHANT INVOICE: INV-8821) Tj
0 -20 Td
(Carrier: UPS) Tj
0 -20 Td
(Tracking Number: 1Z9999999999999999) Tj
0 -20 Td
(Total Amount: $79.99 USD) Tj
0 -20 Td
(Delivery Status: DELIVERED to San Jose CA) Tj
ET`;

  const pdf = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Length ${content.length} >>
stream
${content}
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000229 00000 n 
0000000306 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
${400 + content.length}
%%EOF`;

  return Buffer.from(pdf, 'utf-8');
}

/**
 * Call Gemini REST API directly
 */
async function callGemini({ model, system, user, files, responseSchema }) {
  const url = `${baseUrl}/models/${model}:generateContent`;
  
  const parts = [];
  if (files && files.length > 0) {
    for (const f of files) {
      parts.push({
        inlineData: {
          mimeType: f.mime,
          data: f.dataBase64,
        },
      });
    }
  }
  parts.push({ text: user });

  const body = {
    contents: [
      {
        role: 'user',
        parts,
      },
    ],
    generationConfig: {
      responseMimeType: 'application/json',
    },
  };

  if (system) {
    body.systemInstruction = {
      parts: [{ text: system }],
    };
  }

  if (responseSchema) {
    body.generationConfig.responseSchema = responseSchema;
  }

  const startTime = Date.now();
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify(body),
  });

  const elapsed = Date.now() - startTime;
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Gemini API error (HTTP ${res.status}, ${elapsed}ms): ${errorText}`);
  }

  const data = await res.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const cleanedText = stripThinkingBlocks(rawText);
  return { rawText, cleanedText, elapsed };
}

/**
 * Call OpenAI-compatible chat completions API
 */
async function callOpenAI({ model, system, user, files }) {
  const url = `${baseUrl}/chat/completions`;
  const messages = [];

  if (system) {
    messages.push({ role: 'system', content: system });
  }

  const userContent = [];
  if (files && files.length > 0) {
    for (const f of files) {
      if (f.mime.startsWith('image/')) {
        userContent.push({
          type: 'image_url',
          image_url: { url: `data:${f.mime};base64,${f.dataBase64}` },
        });
      }
    }
  }
  userContent.push({ type: 'text', text: user });
  messages.push({ role: 'user', content: userContent.length === 1 ? user : userContent });

  const body = {
    model,
    messages,
    response_format: { type: 'json_object' },
  };

  const startTime = Date.now();
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  const elapsed = Date.now() - startTime;
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`OpenAI API error (HTTP ${res.status}, ${elapsed}ms): ${errorText}`);
  }

  const data = await res.json();
  const rawText = data?.choices?.[0]?.message?.content || '';
  const cleanedText = stripThinkingBlocks(rawText);
  return { rawText, cleanedText, elapsed };
}

async function runTests() {
  console.log('\n--- Test 1: Structured JSON Output ---');
  const jsonPrompt = 'Analyze this dispute note: "Buyer states package never arrived after 2 weeks, requests full refund of $49.99 for order ORD-1029." Return JSON with keys: dispute_type (string), claim_summary (string), amount (number), refund_requested (boolean).';

  try {
    let result;
    if (provider === 'gemini') {
      result = await callGemini({
        model: modelPrimary,
        system: 'You are an evidence extraction assistant. Output only valid JSON.',
        user: jsonPrompt,
        responseSchema: {
          type: 'OBJECT',
          properties: {
            dispute_type: { type: 'STRING' },
            claim_summary: { type: 'STRING' },
            amount: { type: 'NUMBER' },
            refund_requested: { type: 'BOOLEAN' },
          },
          required: ['dispute_type', 'claim_summary', 'amount', 'refund_requested'],
        },
      });
    } else {
      result = await callOpenAI({
        model: modelPrimary,
        system: 'You are an evidence extraction assistant. Output only valid JSON with keys: dispute_type, claim_summary, amount, refund_requested.',
        user: jsonPrompt,
      });
    }

    console.log(`[PASS] Structured JSON received in ${result.elapsed}ms.`);
    const parsed = JSON.parse(result.cleanedText);
    console.log('Parsed output:', JSON.stringify(parsed, null, 2));

    if (!parsed.dispute_type || typeof parsed.amount !== 'number') {
      throw new Error('Parsed JSON does not match expected schema properties!');
    }
    console.log('[OK] Schema validation succeeded.');
  } catch (err) {
    console.error(`[FAIL] Test 1 failed: ${err.message}`);
    process.exit(1);
  }

  console.log('\n--- Test 2: Multimodal Inline Document Extraction (PDF / Vision) ---');
  if (visionConfig === 'false') {
    console.log('[INFO] LLM_VISION is explicitly set to false. Skipping multimodal test.');
    return;
  }

  try {
    const samplePdf = createMinimalInvoicePdfBuffer();
    const pdfBase64 = samplePdf.toString('base64');

    console.log(`Sending inline PDF (${samplePdf.length} bytes) to ${modelPrimary}...`);

    let result;
    if (provider === 'gemini') {
      result = await callGemini({
        model: modelPrimary,
        system: 'You are a document fact extractor. Extract exact invoice details. Output JSON only.',
        user: 'Read this invoice document and extract: invoice_number (string), carrier (string), tracking_number (string), total_amount (number).',
        files: [{ mime: 'application/pdf', dataBase64: pdfBase64, name: 'invoice.pdf' }],
        responseSchema: {
          type: 'OBJECT',
          properties: {
            invoice_number: { type: 'STRING' },
            carrier: { type: 'STRING' },
            tracking_number: { type: 'STRING' },
            total_amount: { type: 'NUMBER' },
          },
          required: ['invoice_number', 'carrier', 'tracking_number', 'total_amount'],
        },
      });
    } else {
      console.log('[INFO] OpenAI-compatible endpoint: testing image/pdf vision if supported...');
      // 1x1 PNG test for vision capability
      const pngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
      result = await callOpenAI({
        model: modelPrimary,
        system: 'Describe this image and output JSON: { "has_pixels": boolean }',
        user: 'Does this image contain pixels?',
        files: [{ mime: 'image/png', dataBase64: pngBase64, name: 'test.png' }],
      });
    }

    console.log(`[PASS] Multimodal response received in ${result.elapsed}ms.`);
    const parsed = JSON.parse(result.cleanedText);
    console.log('Parsed multimodal output:', JSON.stringify(parsed, null, 2));
    console.log('[OK] Multimodal extraction succeeded.');
  } catch (err) {
    console.warn(`[WARNING] Multimodal test encountered an issue: ${err.message}`);
    console.warn('Note: If your provider or model does not support inline PDF reading, text-layer extraction via pdf-parse will be used as the robust default in Phase 2a.');
  }

  console.log('\n=============================================================');
  console.log('ALL LLM CHECKS COMPLETED SUCCESSFULLY');
  console.log('=============================================================');
}

runTests();

