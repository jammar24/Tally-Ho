/**
 * Tally-Ho Enterprise Cybersecurity & Defense Guardrails
 * 
 * Implements:
 * 1. Sliding window rate limiting (protects LLM tokens & PayPal API against brute force)
 * 2. Strict PayPal Sandbox URL validation & SSRF prevention
 * 3. Prompt injection detection and defense
 * 4. PII and PCI-DSS data redaction
 * 5. Secret and credential masking
 */

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

// In-memory rate limit store
const rateLimitMap = new Map<string, RateLimitRecord>();

/**
 * In-memory sliding window rate limiter
 * @param key Identifier (e.g., client IP or route identifier)
 * @param limit Maximum allowed requests within window
 * @param windowMs Time window in milliseconds
 */
export function checkRateLimit(
  key: string,
  limit: number = 20,
  windowMs: number = 60 * 1000
): { allowed: boolean; remaining: number; resetInSec: number } {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetInSec: Math.ceil(windowMs / 1000) };
  }

  if (record.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetInSec: Math.max(0, Math.ceil((record.resetAt - now) / 1000)),
    };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: limit - record.count,
    resetInSec: Math.ceil((record.resetAt - now) / 1000),
  };
}

/**
 * Strict PayPal Sandbox URL validation.
 * Rejects any request attempting to contact non-sandbox or external untrusted endpoints.
 */
export function validateSandboxUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const allowedHosts = [
      'api-m.sandbox.paypal.com',
      'api.sandbox.paypal.com',
      'generativelanguage.googleapis.com',
    ];
    return (
      parsed.protocol === 'https:' &&
      allowedHosts.includes(parsed.hostname.toLowerCase())
    );
  } catch {
    return false;
  }
}

/**
 * Prompt injection detector
 * Identifies common adversarial override phrases before sending content to the LLM.
 */
export function detectPromptInjection(text: string): { isSuspicious: boolean; pattern?: string } {
  const injectionPatterns = [
    /ignore\s+(all\s+)?(previous|prior|above)\s+instructions/i,
    /system\s*:\s*you\s+are\s+now/i,
    /jailbreak/i,
    /bypass\s+(all\s+)?guardrails/i,
    /reveal\s+(the\s+)?(system\s+prompt|api\s+key|secret)/i,
    /new\s+rule\s*:\s*always\s+rule\s+in\s+favor/i,
    /disregard\s+(all\s+)?rules/i,
    /<script[\s\S]*?>[\s\S]*?<\/script>/i,
    /javascript:\s*/i,
  ];

  for (const pattern of injectionPatterns) {
    if (pattern.test(text)) {
      return { isSuspicious: true, pattern: pattern.toString() };
    }
  }

  return { isSuspicious: false };
}

/**
 * PCI-DSS & PII Redactor
 * Automatically masks credit card numbers and CVVs if accidentally included in evidence notes.
 */
export function sanitizeEvidenceText(text: string): string {
  // Redact potential credit card numbers (13-19 digits with optional spaces/hyphens)
  const ccRegex = /\b(?:\d[ -]*?){13,19}\b/g;
  // Redact potential CVV / CVC (3-4 digits preceded by cvv/cvc)
  const cvvRegex = /\b(?:cvv|cvc|security code)[\s:]*([0-9]{3,4})\b/gi;

  let sanitized = text.replace(ccRegex, (match) => {
    // Only mask if it looks like a real card number
    const digitsOnly = match.replace(/[\s-]/g, '');
    if (digitsOnly.length >= 13 && digitsOnly.length <= 19) {
      return `[CARD_REDACTED_****${digitsOnly.slice(-4)}]`;
    }
    return match;
  });

  sanitized = sanitized.replace(cvvRegex, '$1: [CVV_REDACTED]');

  return sanitized;
}

/**
 * Safely masks API keys and Client IDs for safe client-side display and audit logging.
 */
export function maskCredential(cred?: string | null): string {
  if (!cred) return 'Not configured';
  if (cred.length <= 8) return '********';
  return `${cred.substring(0, 6)}...${cred.substring(cred.length - 4)}`;
}
