'use client';

import React, { useState } from 'react';
import { Dispute, EvidencePackage } from '@/lib/schemas';
import { DocViewer } from './DocViewer';
import { ClaimTable } from './ClaimTable';
import { TracePanel } from './TracePanel';
import { ApproveDialog } from './ApproveDialog';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  IconBolt,
  IconCheck,
  IconShield,
  IconFile,
  IconEye,
  IconTime,
} from '@/components/Icons';

interface CaseViewProps {
  dispute: Dispute;
  initialPackage?: EvidencePackage | null;
}

export function CaseView({ dispute, initialPackage }: CaseViewProps) {
  const { t, language } = useApp();
  const [pkg, setPkg] = useState<EvidencePackage | null>(initialPackage || null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showApprove, setShowApprove] = useState(false);
  const [submitResult, setSubmitResult] = useState<any | null>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch(`/api/disputes/${dispute.id}/analyze`, {
        method: 'POST',
      });
      const data = await res.json();
      if (data.success && data.package) {
        setPkg(data.package);
      }
    } catch (e) {
      console.error('Analysis failed:', e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const strengthBadge = pkg?.assessment?.strength
    ? {
      strong: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
      moderate: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800',
      weak: 'bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-800',
      insufficient: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800',
    }[pkg.assessment.strength]
    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700';

  const reasonLabels: Record<string, { es: string; en: string }> = {
    MERCHANDISE_OR_SERVICE_NOT_RECEIVED: {
      es: 'Artículo No Recibido (INR)',
      en: 'Item Not Received (INR)',
    },
    MERCHANDISE_OR_SERVICE_NOT_AS_DESCRIBED: {
      es: 'No Coincide con Descripción (SNAD)',
      en: 'Not As Described (SNAD)',
    },
    DUPLICATE_TRANSACTION: {
      es: 'Transacción Duplicada',
      en: 'Duplicate Transaction',
    },
    CREDIT_NOT_PROCESSED: {
      es: 'Reembolso No Procesado',
      en: 'Credit Not Processed',
    },
  };

  const disputeReasonLabel = reasonLabels[dispute.reason]
    ? (language === 'es' ? reasonLabels[dispute.reason].es : reasonLabels[dispute.reason].en)
    : dispute.reason.replace(/_/g, ' ');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-200/80 dark:border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <Link href="/disputes" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {t('case.back')}
            </Link>
            <span>/</span>
            <span className="font-mono text-slate-700 dark:text-slate-300">{dispute.id}</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-mono">
              {dispute.id}
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold border bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700">
              {disputeReasonLabel}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="px-4 py-2 bg-[#0070BA] hover:bg-[#005EA6] disabled:opacity-50 text-white text-xs font-semibold rounded-full shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <IconBolt size={14} />
            <span>
              {isAnalyzing
                ? t('case.thinking')
                : pkg
                  ? t('case.reanalyze')
                  : t('case.analyze')}
            </span>
          </button>

          {pkg && !submitResult && (
            <button
              onClick={() => setShowApprove(true)}
              className="px-4 py-2 bg-[#007B40] hover:bg-[#006032] text-white text-xs font-semibold rounded-full shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <IconCheck size={14} />
              <span>{t('case.approve')}</span>
            </button>
          )}
        </div>
      </div>

      {/* Submission Success Banner */}
      {submitResult && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-900 dark:text-emerald-200 text-xs">
          <div className="flex items-center justify-between mb-1">
            <strong className="text-sm flex items-center gap-1.5">
              <IconCheck size={16} className="text-emerald-600 dark:text-emerald-400" />
              <span>
                {language === 'es'
                  ? `Evidencia Enviada a PayPal (${submitResult.mode.toUpperCase()})`
                  : `Evidence Submitted to PayPal (${submitResult.mode.toUpperCase()})`}
              </span>
            </strong>
            <span className="font-mono text-[10px] text-emerald-700 dark:text-emerald-400">
              {new Date().toLocaleTimeString()}
            </span>
          </div>
          <p className="mt-1">
            {submitResult.details?.message ||
              (language === 'es'
                ? 'Paquete de evidencias registrado exitosamente en el Sandbox de PayPal.'
                : 'Evidence package successfully registered on PayPal Sandbox.')}
          </p>
        </div>
      )}

      {/* 3-Panel Case Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Panel: Dispute Details & Buyer Messages (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              {t('case.summary')}
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">{t('case.gross')}</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  ${dispute.amount.value} {dispute.amount.currency}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">{t('case.status')}</span>
                <span className="font-medium text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                  {dispute.status === 'WAITING_FOR_SELLER_RESPONSE'
                    ? (language === 'es' ? 'Acción Requerida (Vendedor)' : 'Action Required (Seller)')
                    : dispute.status.replace(/_/g, ' ')}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">{t('case.due')}</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">
                  {dispute.sellerResponseDueDate
                    ? new Date(dispute.sellerResponseDueDate).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : '—'}
                </span>
              </div>
            </div>

            <div className="mt-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                {t('case.buyerMessage')}
              </h4>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                {dispute.messages[0]?.content || (language === 'es' ? 'Sin mensaje adjunto del comprador.' : 'No message provided by buyer.')}
              </div>
            </div>
          </div>

          {/* Document Quotes & Grounded Facts */}
          <DocViewer facts={pkg?.facts || []} />
        </div>

        {/* Center Panel: Claim Check & Grounded Draft Note (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {pkg ? (
            <>
              {/* Defense Strength Assessment Card */}
              <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {t('case.defense')}
                  </span>
                  <span
                    className={`text-xs font-bold uppercase px-2.5 py-0.5 rounded-full border ${strengthBadge}`}
                  >
                    ● {pkg.assessment.strength}
                  </span>
                </div>

                <div className="text-xs text-slate-700 dark:text-slate-300 mb-3 space-y-1">
                  {pkg.assessment.reasons.map((r, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="text-blue-500 font-bold">•</span>
                      <span>{r}</span>
                    </div>
                  ))}
                </div>

                <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700">
                  {t('case.recommended')}{' '}
                  <strong className="text-slate-900 dark:text-white uppercase font-mono">
                    {pkg.assessment.recommendation}
                  </strong>
                </div>
              </div>

              {/* Claim Check Table */}
              <ClaimTable claimChecks={pkg.claimChecks} />

              {/* Grounded Draft Note */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    {t('case.draft')}
                  </h3>
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded">
                    {language === 'es' ? 'Cero Alucinaciones' : 'Zero Hallucination Code'}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 font-mono leading-relaxed">
                  {pkg.draftNote}
                </div>
              </div>
            </>
          ) : (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 border border-blue-100 dark:border-blue-900">
                <IconShield size={24} />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t('case.readyTitle')}
              </h3>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                {t('case.readyDesc')}
              </p>
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="mt-5 px-5 py-2.5 bg-[#0070BA] hover:bg-[#005EA6] text-white text-xs font-bold rounded-full shadow-xs hover:shadow-md transition-all inline-flex items-center gap-1.5 cursor-pointer"
              >
                <IconBolt size={14} />
                <span>{isAnalyzing ? t('case.thinking') : t('case.launch')}</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Panel: Agent Reasoning Trace (3 cols) */}
        <div className="lg:col-span-3">
          <TracePanel
            trace={pkg?.trace || []}
            origin={pkg?.origin || 'cached'}
            modelInfo={pkg?.model}
          />
        </div>
      </div>

      {/* Approval Modal */}
      {showApprove && pkg && (
        <ApproveDialog
          disputeId={dispute.id}
          pkg={pkg}
          onSuccess={(res) => {
            setSubmitResult(res);
            setShowApprove(false);
          }}
          onClose={() => setShowApprove(false)}
        />
      )}
    </div>
  );
}
