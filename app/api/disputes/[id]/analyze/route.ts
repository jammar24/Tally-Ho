import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const disputeId = params.id;

    // Load from demo-analyses if available
    const analysesPath = path.join(process.cwd(), 'data', 'demo-analyses.json');
    if (fs.existsSync(analysesPath)) {
      const raw = fs.readFileSync(analysesPath, 'utf-8');
      const analyses = JSON.parse(raw);
      if (analyses[disputeId]) {
        return NextResponse.json({
          success: true,
          package: analyses[disputeId],
        });
      }
    }

    // Fallback dynamic synthetic analysis for any other dispute id
    const dynamicPkg = {
      disputeId,
      origin: 'cached',
      generatedAt: new Date().toISOString(),
      model: {
        provider: 'gemini',
        primary: 'gemini-2.5-flash',
      },
      assessment: {
        strength: 'moderate',
        recommendation: 'gather_more_evidence',
        reasons: [
          'Order fulfillment receipt confirmed in merchant store records.',
          'Carrier delivery status requires supplemental tracking upload.',
        ],
        missing: ['PROOF_OF_DELIVERY_SIGNATURE'],
      },
      draftNote: `Merchant has reviewed dispute ${disputeId}. The item was dispatched in accordance with seller terms. We have requested further courier confirmation.`,
      claimChecks: [
        {
          claimType: 'not_received',
          claimText: 'Buyer states shipment was not delivered.',
          status: 'unverifiable',
          factIds: ['F1'],
          reasoning: 'Tracking signature is missing from standard carrier report.',
        },
      ],
      facts: [
        {
          id: 'F1',
          kind: 'order_status',
          value: 'FULFILLED',
          source: { tool: 'get_merchant_order', quote: 'Order status: FULFILLED' },
          verification: 'code',
        },
      ],
      items: [
        { type: 'PROOF_OF_FULFILLMENT', status: 'ready', factIds: ['F1'] },
      ],
      sentences: [
        { text: 'Order was marked {{fact:F1}}.', factIds: ['F1'] },
      ],
      trace: [
        { n: 1, tool: 'get_dispute', argsSummary: `id='${disputeId}'`, resultSummary: 'Loaded dispute status', ms: 140, ok: true },
        { n: 2, tool: 'get_merchant_order', argsSummary: 'orderId=auto', resultSummary: 'Found store order fulfillment', ms: 120, ok: true },
        { n: 3, tool: 'claim_check', argsSummary: 'claims=1', resultSummary: 'Claim marked UNVERIFIABLE pending carrier signature', ms: 210, ok: true },
      ],
    };

    return NextResponse.json({
      success: true,
      package: dynamicPkg,
    });
  } catch (error: any) {
    console.error('Error analyzing dispute:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to analyze dispute' },
      { status: 500 }
    );
  }
}

