import { z } from 'zod';

const EnvSchema = z.object({
  PAYPAL_ENV: z.string().default('sandbox'),
  PAYPAL_API_BASE: z.string().default('https://api-m.sandbox.paypal.com'),
  PAYPAL_CLIENT_ID: z.string().optional().default(''),
  PAYPAL_CLIENT_SECRET: z.string().optional().default(''),
  DATA_MODE: z.enum(['live', 'demo', 'auto']).default('auto'),
  LLM_PROVIDER: z.enum(['gemini', 'openai-compatible']).default('gemini'),
  LLM_API_KEY: z.string().optional().default(''),
  LLM_BASE_URL: z.string().optional().default(''),
  LLM_MODEL_PRIMARY: z.string().optional().default('gemini-2.5-flash'),
  LLM_MODEL_FAST: z.string().optional().default(''),
  LLM_VISION: z.string().default('auto'),
  MAX_AGENT_STEPS: z.coerce.number().default(6),
  MAX_LLM_CALLS_PER_ANALYSIS: z.coerce.number().default(12),
  ANALYSIS_TIMEOUT_MS: z.coerce.number().default(60000),
  DAILY_ANALYSIS_CAP: z.coerce.number().default(15),
});

export const env = EnvSchema.parse({
  PAYPAL_ENV: process.env.PAYPAL_ENV,
  PAYPAL_API_BASE: process.env.PAYPAL_API_BASE,
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET,
  DATA_MODE: process.env.DATA_MODE,
  LLM_PROVIDER: process.env.LLM_PROVIDER,
  LLM_API_KEY: process.env.LLM_API_KEY,
  LLM_BASE_URL: process.env.LLM_BASE_URL,
  LLM_MODEL_PRIMARY: process.env.LLM_MODEL_PRIMARY,
  LLM_MODEL_FAST: process.env.LLM_MODEL_FAST,
  LLM_VISION: process.env.LLM_VISION,
  MAX_AGENT_STEPS: process.env.MAX_AGENT_STEPS,
  MAX_LLM_CALLS_PER_ANALYSIS: process.env.MAX_LLM_CALLS_PER_ANALYSIS,
  ANALYSIS_TIMEOUT_MS: process.env.ANALYSIS_TIMEOUT_MS,
  DAILY_ANALYSIS_CAP: process.env.DAILY_ANALYSIS_CAP,
});

// HARD RULE 1: Refuse to start if PAYPAL_API_BASE does not contain "sandbox"
if (!env.PAYPAL_API_BASE.toLowerCase().includes('sandbox')) {
  throw new Error(
    `[SECURITY FATAL] Production PayPal URL detected (${env.PAYPAL_API_BASE}). DisputeDesk operates STRICTLY in Sandbox mode.`
  );
}

