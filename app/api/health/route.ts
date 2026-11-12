import { NextResponse } from 'next/server';
import { env } from '@/lib/env';
import { getPayPalAccessToken } from '@/lib/paypal';
import { getAIStatus } from '@/lib/ai';

export const dynamic = 'force-dynamic';

export async function GET() {
  const token = await getPayPalAccessToken();
  const ai = getAIStatus();

  return NextResponse.json({
    status: 'ok',
    environment: env.PAYPAL_ENV,
    apiBase: env.PAYPAL_API_BASE,
    dataMode: env.DATA_MODE,
    paypal: {
      connected: Boolean(token),
      clientIdConfigured: Boolean(env.PAYPAL_CLIENT_ID),
      clientIdMasked: env.PAYPAL_CLIENT_ID
        ? `${env.PAYPAL_CLIENT_ID.slice(0, 6)}...${env.PAYPAL_CLIENT_ID.slice(-4)}`
        : 'none',
      sandboxLockEnforced: env.PAYPAL_API_BASE.includes('sandbox'),
    },
    ai: {
      provider: env.LLM_PROVIDER,
      modelPrimary: env.LLM_MODEL_PRIMARY,
      hasKey: ai.hasKey,
      guardrails: {
        maxSteps: env.MAX_AGENT_STEPS,
        maxCallsPerAnalysis: env.MAX_LLM_CALLS_PER_ANALYSIS,
        timeoutMs: env.ANALYSIS_TIMEOUT_MS,
        dailyAnalysisCap: env.DAILY_ANALYSIS_CAP,
        zeroHallucination: true,
      },
    },
    timestamp: new Date().toISOString(),
  });
}

