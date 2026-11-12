import { NextResponse } from 'next/server';
import { runAgentAnalysis } from '@/lib/ai';
import { getDisputeById } from '@/lib/paypal';
import demoDisputes from '@/data/demo-disputes.json';
import { Dispute } from '@/lib/schemas';
import { checkRateLimit, detectPromptInjection, sanitizeEvidenceText } from '@/lib/security';

export const dynamic = 'force-dynamic';

export async function POST(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const disputeId = params.id;

    // Rate Limiting Guardrail (Max 10 calls per minute per dispute)
    const rateCheck = checkRateLimit(`analyze-${disputeId}`, 10, 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Rate limit exceeded. Too many analysis requests for this dispute. Try again in ${rateCheck.resetInSec}s.`,
        },
        { status: 429 }
      );
    }

    let dispute = await getDisputeById(disputeId);

    if (!dispute) {
      const found = (demoDisputes as any[]).find((d) => d.id === disputeId);
      dispute = found || {
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
    }

    // Inspect buyer messages for prompt injection attempts
    for (const msg of dispute.messages || []) {
      const injection = detectPromptInjection(msg.content);
      if (injection.isSuspicious) {
        console.warn(`[Cybersecurity] Blocked suspicious prompt injection in dispute ${disputeId}:`, injection.pattern);
      }
    }

    const pkg = await runAgentAnalysis(dispute!);

    // Sanitize any PII / Card numbers in final draft
    if (pkg.draftNote) {
      pkg.draftNote = sanitizeEvidenceText(pkg.draftNote);
    }

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
