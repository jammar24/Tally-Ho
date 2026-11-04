import { NextResponse } from 'next/server';
import { ApprovalSchema } from '@/lib/schemas';
import { submitEvidence } from '@/lib/paypal';

export const dynamic = 'force-dynamic';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const approval = ApprovalSchema.parse(body);

    const payload = {
      note: approval.editedNote,
      evidence_type: 'PROOF_OF_DELIVERY',
      submitted_at: approval.approvedAt,
      confirmed_facts: approval.confirmedFactIds,
    };

    const result = await submitEvidence(params.id, payload);

    return NextResponse.json({
      success: true,
      mode: result.mode,
      details: result.details,
    });
  } catch (error: any) {
    console.error('Submission error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Invalid approval payload' },
      { status: 400 }
    );
  }
}

