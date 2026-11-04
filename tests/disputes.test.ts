import { describe, it, expect } from 'vitest';
import demoDisputes from '@/data/demo-disputes.json';
import demoAnalyses from '@/data/demo-analyses.json';
import { DisputeSchema, EvidencePackageSchema } from '@/lib/schemas';

describe('Dispute Desk Data & Agent Integrity', () => {
  it('should load all 10 synthetic demo disputes conforming to DisputeSchema', () => {
    expect(demoDisputes).toBeInstanceOf(Array);
    expect(demoDisputes.length).toBeGreaterThanOrEqual(10);

    for (const dispute of demoDisputes) {
      const parsed = DisputeSchema.safeParse(dispute);
      expect(
        parsed.success,
        `Dispute ${(dispute as any).id} failed schema validation: ${
          !parsed.success ? JSON.stringify(parsed.error) : ''
        }`
      ).toBe(true);
      expect((dispute as any).amount?.currency).toBe('USD');
      expect((dispute as any).id).toMatch(/^PP-D-\d+$/);
    }
  });

  it('should have cached AI evidence packages that validate against EvidencePackageSchema', () => {
    const analysisKeys = Object.keys(demoAnalyses);
    expect(analysisKeys.length).toBeGreaterThan(0);

    for (const key of analysisKeys) {
      const pkg = (demoAnalyses as any)[key];
      const parsed = EvidencePackageSchema.safeParse(pkg);
      expect(
        parsed.success,
        `Cached analysis for ${key} failed validation: ${
          !parsed.success ? JSON.stringify(parsed.error) : ''
        }`
      ).toBe(true);
      expect(pkg.facts.length).toBeGreaterThan(0);
      expect(pkg.claimChecks.length).toBeGreaterThan(0);
      expect(pkg.draftNote.length).toBeGreaterThan(20);
      expect(pkg.assessment.strength).toBeDefined();
    }
  });

  it('should have dispute analysis recommendations that guide merchant workflow', () => {
    for (const key of Object.keys(demoAnalyses)) {
      const pkg = (demoAnalyses as any)[key];
      expect(['submit', 'accept', 'gather_more_evidence']).toContain(
        pkg.assessment.recommendation
      );
    }
  });
});
