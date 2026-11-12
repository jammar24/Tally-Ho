'use client';

import React, { useState } from 'react';
import { EvidencePackage } from '@/lib/schemas';
import { useApp } from '@/context/AppContext';

interface ApproveDialogProps {
  disputeId: string;
  pkg: EvidencePackage;
  onSuccess: (result: any) => void;
  onClose: () => void;
}

export function ApproveDialog({ disputeId, pkg, onSuccess, onClose }: ApproveDialogProps) {
  const { t, language } = useApp();
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
        throw new Error(data.error || (language === 'es' ? 'Error al enviar la evidencia' : 'Submission failed'));
      }

      onSuccess(data);
    } catch (err: any) {
      setError(err.message || (language === 'es' ? 'Ocurrió un error inesperado al enviar.' : 'An unexpected error occurred.'));
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full p-6 shadow-xl border border-slate-200 dark:border-slate-800 transition-colors">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-300 dark:border-amber-800">
              {t('dialog.badge')}
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              {t('dialog.title')}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg font-bold p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900 rounded-xl text-xs text-blue-900 dark:text-blue-200 leading-relaxed">
            <strong>{language === 'es' ? 'Verificación Humana Obligatoria (HIL):' : 'Human-In-The-Loop Verification:'}</strong>{' '}
            {t('dialog.hil')}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              {t('dialog.noteLabel')}
            </label>
            <textarea
              rows={5}
              value={editedNote}
              onChange={(e) => setEditedNote(e.target.value)}
              className="w-full text-xs font-mono p-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-[#0070BA] focus:outline-hidden leading-relaxed"
            />
          </div>

          <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-slate-50 dark:bg-slate-800/50 text-xs">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">{t('dialog.summary')}</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 font-mono text-[11px]">
              <li>{language === 'es' ? 'Hechos verificados incluidos:' : 'Verified facts included:'} <strong>{pkg.facts.length}</strong></li>
              <li>{language === 'es' ? 'Reclamos del comprador refutados:' : 'Buyer claims contested:'} <strong>{pkg.claimChecks.length}</strong></li>
              <li>{language === 'es' ? 'Solidez de defensa calculada:' : 'Calculated defense strength:'} <strong className="uppercase">{pkg.assessment.strength}</strong></li>
            </ul>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 rounded-xl text-xs">
              {error}
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
          >
            {t('dialog.cancel')}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="px-5 py-2 text-xs font-bold text-white bg-[#0070BA] hover:bg-[#005EA6] active:bg-[#003087] disabled:opacity-50 rounded-full shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            {isSubmitting ? t('dialog.submitting') : t('dialog.submit')}
          </button>
        </div>
      </div>
    </div>
  );
}
