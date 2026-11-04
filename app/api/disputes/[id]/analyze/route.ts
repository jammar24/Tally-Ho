import { NextResponse } from 'next/server';
import { runAgentAnalysis } from '@/lib/ai';
import demoDisputes from '@/data/demo-disputes.json';
import { Dispute } from '@/lib/schemas';

export const dynamic = 'force-dynamic';

export async function POST(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const disputeId = params.id;
    const found = (demoDisputes as any[]).find((d) => d.id === disputeId);

    const dispute: Dispute = found || {
      id: disputeId,
      reason: 'MERCHANDISE_OR_SERVICE_NOT_RECEIVED',
      status: 'WAITING_FOR_SELLER_RESPONSE',
      amount: { value: '149.99', currency: 'USD' },
      createdAt: new Date().toISOString(),
      messages: [
        {
          postedBy: 'BUYER',
          time: new Date().toISOString(),
          content: 'I did not receive this item.',
        },
      ],
      disputedTransactions: [],
      requestedEvidence: ['PROOF_OF_DELIVERY'],
      source: 'demo',
    };

    const pkg = await runAgentAnalysis(dispute);

    return NextResponse.json({
      success: true,
      package: pkg,
    });
  } catch (error: any) {
    console.error('Error analyzing dispute:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to analyze dispute' },
      { status: 500 }
    );
  }
}
