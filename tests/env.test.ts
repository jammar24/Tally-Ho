import { describe, it, expect } from 'vitest';
import { env } from '@/lib/env';

describe('DisputeDesk Security & Sandbox Isolation', () => {
  it('should enforce Sandbox environment in PAYPAL_ENV', () => {
    expect(env.PAYPAL_ENV).toBe('sandbox');
  });

  it('should strictly contain "sandbox" in PAYPAL_API_BASE', () => {
    expect(env.PAYPAL_API_BASE.toLowerCase()).toContain('sandbox');
    expect(env.PAYPAL_API_BASE).toBe('https://api-m.sandbox.paypal.com');
  });

  it('should have safety bounded step caps configured', () => {
    expect(env.MAX_AGENT_STEPS).toBeLessThanOrEqual(10);
    expect(env.MAX_LLM_CALLS_PER_ANALYSIS).toBeLessThanOrEqual(20);
    expect(env.ANALYSIS_TIMEOUT_MS).toBeGreaterThanOrEqual(10000);
  });
});

