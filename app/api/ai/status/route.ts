import { NextResponse } from 'next/server';
import { getAIStatus } from '@/lib/ai';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const status = getAIStatus();
    return NextResponse.json({
      success: true,
      engine: 'Tally-Ho Dispute Engine',
      ai: status,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

