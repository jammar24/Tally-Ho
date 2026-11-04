'use client';

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  IconStore,
  IconBolt,
  IconUser,
  IconFile,
  IconFolder,
  IconCog,
  IconCheckCircle,
  IconShield,
  IconTime,
  IconUpload,
  IconPlug,
  IconEye,
} from '@/components/Icons';

interface EvidenceDoc {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  disputeId: string;
  verified: boolean;
}

export default function MerchantPortalPage() {
  const { t, language, user, switchRole } = useApp();
  const [activeTab, setActiveTab] = useState<'disputes' | 'vault' | 'settings'>('disputes');
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  const [documents, setDocuments] = useState<EvidenceDoc[]>([
    {
      id: 'DOC-901',
      name: 'fedex_receipt_940011189922.pdf',
      type: 'Proof of Delivery (Carrier)',
      size: '245 KB',
      uploadedAt: 'Nov 03, 2026',
      disputeId: 'PP-D-7001',
      verified: true,
    },
    {
      id: 'DOC-902',
      name: 'invoice_INV-2026-0891.pdf',
      type: 'Order Invoice & Serial',
      size: '180 KB',
      uploadedAt: 'Nov 02, 2026',
      disputeId: 'PP-D-7001',
      verified: true,
    },
    {
      id: 'DOC-903',
      name: 'usps_return_label_94001118.pdf',
      type: 'Return Authorization',
      size: '115 KB',
      uploadedAt: 'Nov 04, 2026',
      disputeId: 'PP-D-7004',
      verified: true,
    },
    {
      id: 'DOC-904',
      name: 'store_terms_electronics.pdf',
      type: 'Merchant Return Policy',
      size: '320 KB',
      uploadedAt: 'Oct 15, 2026',
      disputeId: 'Global',
      verified: true,
    },
  ]);

  const merchantDisputes = [
    {
      id: 'PP-D-7001',
      buyer: 'john.doe@example.com',
      orderId: 'ORD-99824',
      amount: '$149.99 USD',
      reason: 'Item Not Received (INR)',
      evidenceStatus: '100% Ready (FedEx Delivery Verified)',
      deadline: 'Nov 10, 2026',
      urgent: true,
    },
    {
      id: 'PP-D-7004',
      buyer: 'sarah.m@example.com',
      orderId: 'ORD-99831',
      amount: '$220.00 USD',
      reason: 'Not As Described (SNAD)',
      evidenceStatus: 'Prepaid Return Label Issued',
      deadline: 'Nov 09, 2026',
      urgent: true,
    },
    {
      id: 'PP-D-7005',
      buyer: 'david.k@example.com',
      orderId: 'ORD-99840',
      amount: '$75.00 USD',
      reason: 'Duplicate Transaction',
      evidenceStatus: 'Distinct Order Receipts Available',
      deadline: 'Nov 12, 2026',
      urgent: false,
    },
  ];

  const handleSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newDoc: EvidenceDoc = {
        id: `DOC-${Math.floor(1000 + Math.random() * 9000)}`,
        name: file.name,
        type: 'Merchant Proof (PDF/Image)',
        size: `${Math.round(file.size / 1024)} KB`,
        uploadedAt: 'Just now',
        disputeId: 'PP-D-7001',
        verified: true,
      };
      setDocuments([newDoc, ...documents]);
      setUploadSuccess(
        language === 'es'
          ? `Documento "${file.name}" cargado e indexado en la bóveda de evidencia.`
          : `Document "${file.name}" uploaded and indexed into the evidence vault.`
      );
      setTimeout(() => setUploadSuccess(null), 4000);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 transition-colors">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-slate-200/80 dark:border-slate-800/80 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center gap-1.5">
              <IconStore size={12} />
              <span>{language === 'es' ? 'Portal de Comerciante' : 'Merchant Hub'}</span>
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Merchant ID: MERCH-US-8921X • PayPal Sandbox
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t('merchant.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t('merchant.subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/disputes"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <IconBolt size={14} />
            <span>{language === 'es' ? 'Ver Disputas Activas' : 'Open Dispute Inbox'}</span>
          </Link>
          <button
            onClick={() => switchRole('customer')}
            className="px-3.5 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-medium border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <IconUser size={14} className="text-purple-500" />
            <span>{language === 'es' ? 'Ver como Cliente' : 'View as Customer'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('disputes')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
            activeTab === 'disputes'
              ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <IconFile size={13} />
          <span>{language === 'es' ? 'Disputas de la Tienda (3)' : 'Store Disputes (3)'}</span>
        </button>
        <button
          onClick={() => setActiveTab('vault')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
            activeTab === 'vault'
              ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <IconFolder size={13} />
          <span>{t('merchant.vault.title')} ({documents.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
            activeTab === 'settings'
              ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <IconCog size={13} />
          <span>{t('merchant.settings.title')}</span>
        </button>
      </div>

      {/* Upload Notification */}
      {uploadSuccess && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconCheckCircle size={15} className="text-emerald-600 dark:text-emerald-400" />
            <span>{uploadSuccess}</span>
          </div>
          <span className="font-semibold text-[11px] font-mono">AI Indexed</span>
        </div>
      )}

      {/* Tab 1: Merchant Disputes */}
      {activeTab === 'disputes' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {language === 'es' ? 'Capital en Disputa' : 'Capital Under Dispute'}
              </span>
              <p className="text-2xl font-black text-slate-900 dark:text-white mt-1 font-mono">
                $444.99 USD
              </p>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 mt-1">
                <IconShield size={12} />
                <span>100% {language === 'es' ? 'Elegible Protección Vendedor' : 'Eligible Seller Protection'}</span>
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {language === 'es' ? 'Evidencia Lista para Envío' : 'Evidence Ready for Submit'}
              </span>
              <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1 font-mono">
                2 / 3
              </p>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                {language === 'es' ? '1 pendiente de retorno físico' : '1 awaiting physical return'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {language === 'es' ? 'Tiempo Promedio de Cierre' : 'Avg Defense Speed'}
              </span>
              <p className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1 font-mono">
                3.8 min
              </p>
              <span className="text-[11px] text-purple-600 dark:text-purple-400 font-medium flex items-center gap-1 mt-1">
                <IconBolt size={12} />
                <span>{language === 'es' ? 'Asistido por Agente Gemini' : 'Assisted by Gemini Agent'}</span>
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {language === 'es' ? 'Casos que requieren respuesta del comerciante' : 'Cases requiring merchant evidence'}
              </h3>
              <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
                <IconTime size={12} />
                <span>{language === 'es' ? '3 plazos abiertos' : '3 active deadlines'}</span>
              </span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {merchantDisputes.map((d) => (
                <div
                  key={d.id}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-slate-900 dark:text-white">
                        {d.id}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {d.orderId}
                      </span>
                      {d.urgent && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                          {d.deadline}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      {d.reason} • <span className="font-medium text-slate-800 dark:text-slate-200">{d.buyer}</span>
                    </p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      ✓ {d.evidenceStatus}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                      {d.amount}
                    </span>
                    <Link
                      href={`/disputes/${d.id}`}
                      className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
                    >
                      <IconEye size={13} />
                      <span>{language === 'es' ? 'Inspeccionar y Defender' : 'Inspect & Defend'}</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Evidence Vault */}
      {activeTab === 'vault' && (
        <div className="space-y-6">
          {/* Upload Dropzone */}
          <div className="p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl bg-slate-50/60 dark:bg-slate-800/40 text-center hover:border-blue-500 transition-colors">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 border border-blue-100 dark:border-blue-900">
              <IconUpload size={22} />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              {t('merchant.vault.upload')}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto leading-relaxed">
              {language === 'es'
                ? 'Arrastra guías de FedEx/USPS, comprobantes de entrega firmados o facturas de almacén. La IA extraerá los números de guía automáticamente.'
                : 'Drop FedEx/USPS tracking receipts, signed delivery slips, or warehouse invoices. The AI agent extracts tracking numbers and dates automatically.'}
            </p>
            <label className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl text-xs cursor-pointer shadow-xs transition-colors">
              <IconUpload size={13} />
              <span>{language === 'es' ? 'Seleccionar Archivo Local' : 'Browse Files'}</span>
              <input
                type="file"
                accept=".pdf,.jpg,.png"
                onChange={handleSimulatedUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Document list */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {language === 'es' ? 'Documentos de Soporte Indexados' : 'Indexed Support Documents'}
              </h3>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 flex items-center justify-between hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                      <IconFile size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-900 dark:text-white">
                        {doc.name}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {doc.type} • {doc.size} • Linked to {doc.disputeId}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      ✓ AI Verified
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">{doc.uploadedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Store Settings & PayPal Sandbox */}
      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <IconPlug size={16} className="text-blue-500" />
              <span>{language === 'es' ? 'Webhooks de PayPal Sandbox' : 'PayPal Sandbox Webhooks'}</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {language === 'es'
                ? 'Tally-Ho escucha eventos de webhook en tiempo real desde api-m.sandbox.paypal.com:'
                : 'Tally-Ho listens for live dispute events from api-m.sandbox.paypal.com:'}
            </p>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="font-mono text-slate-800 dark:text-slate-200">CUSTOMER.DISPUTE.CREATED</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">● Active</span>
              </li>
              <li className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="font-mono text-slate-800 dark:text-slate-200">CUSTOMER.DISPUTE.RESOLVED</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">● Active</span>
              </li>
              <li className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="font-mono text-slate-800 dark:text-slate-200">PAYMENT.CAPTURE.COMPLETED</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">● Active</span>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <IconShield size={16} className="text-indigo-500" />
              <span>{t('merchant.autoDefense')}</span>
            </h3>
            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white block">
                    {language === 'es' ? 'Auto-Extracción de Guías FedEx/USPS' : 'Auto-Extract Carrier Tracking'}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                    {language === 'es' ? 'Consultar APIs oficiales automáticamente' : 'Query official tracking APIs automatically'}
                  </span>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white block">
                    {language === 'es' ? 'Filtro Human-in-the-Loop Obligatorio' : 'Strict Human-in-the-Loop Filter'}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                    {language === 'es' ? 'Requiere aprobación explícita antes de enviar a PayPal' : 'Requires explicit human click before submitting to PayPal'}
                  </span>
                </div>
                <input type="checkbox" defaultChecked disabled className="w-4 h-4 text-blue-600 rounded" />
              </label>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
