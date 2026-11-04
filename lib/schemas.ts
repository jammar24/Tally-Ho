import { z } from 'zod';

export const MoneySchema = z.object({
  value: z.string(),
  currency: z.string().default('USD'),
});

export const DisputeMessageSchema = z.object({
  postedBy: z.enum(['BUYER', 'SELLER', 'PAYPAL']),
  time: z.string(),
  content: z.string(),
});

export const DisputedTransactionSchema = z.object({
  buyerTransactionId: z.string().optional(),
  sellerTransactionId: z.string().optional(),
  grossAmount: MoneySchema,
  invoiceNumber: z.string().optional(),
  custom: z.string().optional(),
});

export const DisputeSchema = z.object({
  id: z.string(),
  reason: z.enum([
    'MERCHANDISE_OR_SERVICE_NOT_RECEIVED',
    'MERCHANDISE_OR_SERVICE_NOT_AS_DESCRIBED',
    'DUPLICATE_TRANSACTION',
    'CREDIT_NOT_PROCESSED',
    'UNAUTHORISED',
    'OTHER',
  ]),
  status: z.enum([
    'WAITING_FOR_SELLER_RESPONSE',
    'WAITING_FOR_BUYER_RESPONSE',
    'UNDER_PAYPAL_REVIEW',
    'RESOLVED',
    'CLOSED',
  ]),
  amount: MoneySchema,
  createdAt: z.string(),
  sellerResponseDueDate: z.string().optional(),
  messages: z.array(DisputeMessageSchema).default([]),
  disputedTransactions: z.array(DisputedTransactionSchema).default([]),
  requestedEvidence: z.array(z.string()).default([]),
  source: z.enum(['paypal', 'demo']).default('demo'),
});

export type Dispute = z.infer<typeof DisputeSchema>;

export const FactSourceSchema = z.object({
  tool: z.string(),
  path: z.string().optional(),
  docId: z.string().optional(),
  page: z.number().optional(),
  quote: z.string().optional(),
});

export const FactSchema = z.object({
  id: z.string(), // e.g., F1, F2
  kind: z.string(), // e.g., tracking_number, delivery_date, carrier, shipping_address, amount
  value: z.string(),
  source: FactSourceSchema,
  verification: z.enum(['code', 'text-layer', 'needs-human']),
});

export type Fact = z.infer<typeof FactSchema>;

export const AgentStepSchema = z.object({
  n: z.number(),
  tool: z.string(),
  argsSummary: z.string(),
  resultSummary: z.string(),
  ms: z.number(),
  ok: z.boolean(),
});

export type AgentStep = z.infer<typeof AgentStepSchema>;

export const ClaimCheckSchema = z.object({
  claimType: z.string(), // not_received, not_as_described, etc.
  claimText: z.string(),
  status: z.enum(['supported', 'contradicted', 'unverifiable']),
  factIds: z.array(z.string()),
  reasoning: z.string().optional(),
});

export type ClaimCheck = z.infer<typeof ClaimCheckSchema>;

export const EvidenceItemSchema = z.object({
  type: z.string(), // PROOF_OF_FULFILLMENT, PROOF_OF_DELIVERY, RETURN_POLICY, etc.
  status: z.enum(['ready', 'missing', 'needs-human']),
  factIds: z.array(z.string()),
  note: z.string().optional(),
});

export type EvidenceItem = z.infer<typeof EvidenceItemSchema>;

export const AssessmentSchema = z.object({
  strength: z.enum(['strong', 'moderate', 'weak', 'insufficient']),
  recommendation: z.enum(['submit', 'accept', 'gather_more_evidence']),
  reasons: z.array(z.string()),
  missing: z.array(z.string()).default([]),
});

export type Assessment = z.infer<typeof AssessmentSchema>;

export const GroundedSentenceSchema = z.object({
  text: z.string(),
  factIds: z.array(z.string()),
});

export type GroundedSentence = z.infer<typeof GroundedSentenceSchema>;

export const EvidencePackageSchema = z.object({
  disputeId: z.string(),
  trace: z.array(AgentStepSchema),
  facts: z.array(FactSchema),
  claimChecks: z.array(ClaimCheckSchema),
  items: z.array(EvidenceItemSchema),
  sentences: z.array(GroundedSentenceSchema),
  draftNote: z.string(),
  assessment: AssessmentSchema,
  model: z.object({
    provider: z.string(),
    primary: z.string(),
    fast: z.string().optional(),
  }),
  origin: z.enum(['live', 'cached']),
  generatedAt: z.string(),
});

export type EvidencePackage = z.infer<typeof EvidencePackageSchema>;

export const ApprovalSchema = z.object({
  disputeId: z.string(),
  approvedAt: z.string(),
  editedNote: z.string(),
  confirmedFactIds: z.array(z.string()),
  overrideMissing: z.boolean().default(false),
});

export type Approval = z.infer<typeof ApprovalSchema>;

