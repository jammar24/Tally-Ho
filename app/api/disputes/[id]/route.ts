import { NextResponse } from 'next/server';
import { getDisputeById } from '@/lib/paypal';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const dispute = await getDisputeById(params.id);
    if (!dispute) {
      return NextResponse.json(
        { success: false, error: 'Dispute not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      dispute,
    });
  } catch (error) {
    console.error('Error fetching dispute:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

