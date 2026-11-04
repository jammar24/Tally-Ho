import { NextResponse } from 'next/server';
import { env } from '@/lib/env';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    environment: env.PAYPAL_ENV,
    apiBase: env.PAYPAL_API_BASE,
    dataMode: env.DATA_MODE,
    llmProvider: env.LLM_PROVIDER,
    timestamp: new Date().toISOString(),
  });
}

