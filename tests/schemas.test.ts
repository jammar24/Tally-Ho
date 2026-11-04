import { describe, it, expect } from 'vitest';
import { DisputeSchema, FactSchema, ClaimCheckSchema, EvidencePackageSchema } from '@/lib/schemas';
import fs from 'fs';
import path from 'path';

describe('DisputeDesk Schemas & Ground Truth', () => {
  it('should validate demo disputes against DisputeSchema', () => {
    const filePath = path.join(process.cwd(), 'data', 'demo-disputes.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const disputes = JSON.parse(raw);

    expect(Array.isArray(disputes)).toBe(true);
    expect(disputes.length).toBeGreaterThanOrEqual(10);

    for (const dispute of disputes) {
      const parsed = DisputeSchema.safeParse(dispute);
      expect(parsed.success).toBe(true);
      if (parsed.success) {
        expect(parsed.data.id).toMatch(/^PP-D-/);
        expect(parsed.data.amount.currency).toBe('USD');
      }
    }
  });

  it('should validate FactSchema structure', () => {
    const fact = {
      id: 'F1',
      kind: 'tracking_number',
      value: '1Z9999999999999999',
      source: {
        tool: 'read_doc',
        docId: 'shipping_label.pdf',
        quote: 'Tracking: 1Z9999999999999999',
      },
      verification: 'text-layer' as const,
    };
    const result = FactSchema.safeParse(fact);
    expect(result.success).toBe(true);
  });

  it('should validate ClaimCheckSchema structure', () => {
    const claim = {
      claimType: 'not_received',
      claimText: 'Buyer states package never arrived',
      status: 'contradicted' as const,
      factIds: ['F1'],
      reasoning: 'Carrier confirms delivery to buyer address on Nov 05, 2026',
    };
    const result = ClaimCheckSchema.safeParse(claim);
    expect(result.success).toBe(true);
  });

  it('should validate cached demo analyses against EvidencePackageSchema', () => {
    const filePath = path.join(process.cwd(), 'data', 'demo-analyses.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const analyses = JSON.parse(raw);

    expect(analyses['PP-D-7001']).toBeDefined();
    const pkgResult = EvidencePackageSchema.safeParse(analyses['PP-D-7001']);
    expect(pkgResult.success).toBe(true);
    if (pkgResult.success) {
      expect(pkgResult.data.assessment.strength).toBe('strong');
      expect(pkgResult.data.assessment.recommendation).toBe('submit');
    }
  });
});
