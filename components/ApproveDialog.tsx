'use client';

import React, { useState } from 'react';
import { EvidencePackage } from '@/lib/schemas';

interface ApproveDialogProps {
  disputeId: string;
  pkg: EvidencePackage;
  onSuccess: (result: any) => void;
  onClose: () => void;
}

export function ApproveDialog({ disputeId, pkg, onSuccess, onClose }: ApproveDialogProps) {
  const [editedNote, setEditedNote] = useState(pkg.draftNote);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/disputes/${disputeId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          disputeId,
          approvedAt: new Date().toISOString(),
          editedNote,
          confirmedFactIds: pkg.facts.map((f) => f.id),
          overrideMissing: false,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Submission failed');
      }

      onSuccess(data);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl border border-slate-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
              ⚠️ Sandbox Approval
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              Human Review & Evidence Submission
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 leading-relaxed">
            <strong>Human-In-The-Loop Verification:</strong> Nothing is submitted to PayPal without your explicit approval. Please review the response draft below. You may edit the wording directly.
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Response Note to PayPal Dispute Center
            </label>
            <textarea
              rows={5}
              value={editedNote}
              onChange={(e) => setEditedNote(e.target.value)}
              className="w-full text-sm font-mono p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 text-xs">
            <h4 className="font-semibold text-slate-800 mb-1">Package Summary:</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li>Verified facts included: <strong>{pkg.facts.length}</strong></li>
              <li>Buyer claims contested: <strong>{pkg.claimChecks.length}</strong></li>
              <li>Calculated defense strength: <strong className="uppercase">{pkg.assessment.strength}</strong></li>
            </ul>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs">
              {error}
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg shadow-xs transition-colors flex items-center gap-2"
          >
            {isSubmitting ? 'Submitting to PayPal...' : 'Approve & Submit Evidence'}
          </button>
        </div>
      </div>
    </div>
  );
}

