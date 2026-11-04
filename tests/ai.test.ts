import { describe, it, expect } from 'vitest';
import { stripThinkingBlocks, getAIStatus, runAgentAnalysis } from '@/lib/ai';
import { EvidencePackageSchema, Dispute } from '@/lib/schemas';

describe('Tally-Ho AI Engine & Inference Integration', () => {
  it('should clean reasoning thinking blocks and markdown fences', () => {
    const raw = `<think>Internal thoughts about carrier delivery</think>\`\`\`json\n{"result": "ok"}\n\`\`\``;
    const cleaned = stripThinkingBlocks(raw);
    expect(cleaned).toBe('{"result": "ok"}');
  });

  it('should report AI status with enforced guardrails', () => {
    const status = getAIStatus();
    expect(status.provider).toBeDefined();
    expect(status.model).toBeDefined();
    expect(status.guardrails.maxSteps).toBeLessThanOrEqual(6);
    expect(status.guardrails.sandboxLock).toBe(true);
    expect(status.guardrails.zeroHallucination).toBe(true);
  });

  it('should produce a fully validated EvidencePackage from agent analysis', async () => {
    const sampleDispute: Dispute = {
      id: 'PP-D-7001',
      reason: 'MERCHANDISE_OR_SERVICE_NOT_RECEIVED',
      status: 'WAITING_FOR_SELLER_RESPONSE',
      amount: { value: '149.99', currency: 'USD' },
      createdAt: '2026-10-25T14:32:00Z',
      messages: [
        {
          postedBy: 'BUYER',
          time: '2026-10-25T14:32:00Z',
          content: 'I ordered headphones but package never arrived at my address.',
        },
      ],
      disputedTransactions: [],
      requestedEvidence: ['PROOF_OF_DELIVERY'],
      source: 'demo',
    };

    const pkg = await runAgentAnalysis(sampleDispute);
    const parsed = EvidencePackageSchema.safeParse(pkg);
    expect(parsed.success, `Schema validation failed: ${!parsed.success ? JSON.stringify(parsed.error) : ''}`).toBe(true);

    expect(pkg.disputeId).toBe('PP-D-7001');
    expect(pkg.facts.length).toBeGreaterThan(0);
    expect(pkg.claimChecks.length).toBeGreaterThan(0);
    expect(pkg.draftNote.length).toBeGreaterThan(20);
    expect(['strong', 'moderate', 'weak', 'insufficient']).toContain(pkg.assessment.strength);
    expect(pkg.trace.length).toBeGreaterThan(0);
    expect(pkg.trace.length).toBeLessThanOrEqual(6); // Hard cap at 6 steps
  });
});

