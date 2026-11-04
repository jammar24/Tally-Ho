import { NextResponse } from 'next/server';
import { getDisputes } from '@/lib/paypal';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const disputes = await getDisputes();
    return NextResponse.json({
      success: true,
      count: disputes.length,
      disputes,
    });
  } catch (error) {
    console.error('Error fetching disputes:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch disputes' },
      { status: 500 }
    );
  }
}

