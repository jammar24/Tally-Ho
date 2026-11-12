'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';
import Image from 'next/image';
import { PortalNavBar } from '@/components/PortalNavBar';
import {
  IconUser,
  IconShield,
  IconCheckCircle,
  IconSearch,
  IconPackage,
  IconEye,
  IconCheck,
  IconPayPal,
} from '@/components/Icons';

interface CustomerDispute {
  id: string;
  orderNumber: string;
  item: string;
  amount: string;
  status: string;
  date: string;
  buyerClaim: string;
  merchantVerification: string;
  carrierProof: string;
  timeline: { step: string; time: string; done: boolean }[];
}

export default function CustomerPortalPage() {
  const { t, language, user, switchRole } = useApp();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedCaseId, setSelectedCaseId] = useState<string>('PP-D-7001');

  useEffect(() => {
    if (user === null) {
      router.replace('/auth');
    }
  }, [user, router]);

  const customerDisputes: CustomerDispute[] = [
    {
      id: 'PP-D-7001',
      orderNumber: 'ORD-99824',
      item: 'Wireless Noise-Canceling Headphones (Black)',
      amount: '$149.99 USD',
      status: language === 'es' ? 'Evidencia de Entrega Verificada' : 'Delivery Evidence Verified',
      date: 'Nov 02, 2026',
      buyerClaim: language === 'es' ? 'El paquete nunca llegó a mi domicilio.' : 'Package never arrived at my address.',
      merchantVerification:
        language === 'es'
          ? 'Guía de FedEx #1Z9999999999999999 confirma entrega el 05 de Noviembre a las 2:45 PM en puerta principal.'
          : 'FedEx Tracking #1Z9999999999999999 confirms delivery on Nov 05 at 2:45 PM to front porch.',
      carrierProof: 'FedEx Express • Signed by: Resident Front Door (GPS: Verified)',
      timeline: [
        {
          step: language === 'es' ? 'Orden realizada y enviada' : 'Order placed & dispatched',
          time: 'Nov 02, 2026',
          done: true,
        },
        {
          step: language === 'es' ? 'Reclamo abierto en PayPal' : 'Claim opened on PayPal',
          time: 'Nov 08, 2026',
          done: true,
        },
        {
          step: language === 'es' ? 'Evidencia de guía verificada por IA' : 'Carrier proof verified by AI',
          time: 'Nov 09, 2026',
          done: true,
        },
        {
          step: language === 'es' ? 'Resolución transparente con comprador' : 'Transparent resolution with buyer',
          time: 'Nov 10, 2026',
          done: true,
        },
      ],
    },
    {
      id: 'PP-D-7004',
      orderNumber: 'ORD-99831',
      item: 'Smartwatch Pro 42mm (Silver)',
      amount: '$220.00 USD',
      status: language === 'es' ? 'Etiqueta de Retorno Disponible' : 'Prepaid Return Label Issued',
      date: 'Nov 04, 2026',
      buyerClaim: language === 'es' ? 'El color y las funciones no corresponden con la descripción.' : 'Color and features differ from online photos.',
      merchantVerification:
        language === 'es'
          ? 'El comerciante ha emitido una etiqueta prepagada de devolución sin costo para reembolso inmediato al recibir.'
          : 'Merchant issued a complimentary prepaid return label for 100% full refund upon receipt.',
      carrierProof: 'USPS Priority Return Label #9400111899564',
      timeline: [
        {
          step: language === 'es' ? 'Orden entregada' : 'Order delivered',
          time: 'Nov 06, 2026',
          done: true,
        },
        {
          step: language === 'es' ? 'Reclamo Not-As-Described abierto' : 'SNAD claim initiated',
          time: 'Nov 09, 2026',
          done: true,
        },
        {
          step: language === 'es' ? 'Etiqueta de devolución generada' : 'Return label generated',
          time: 'Nov 10, 2026',
          done: true,
        },
        {
          step: language === 'es' ? 'Pendiente entrega en sucursal' : 'Awaiting package drop-off',
          time: 'In Progress',
          done: false,
        },
      ],
    },
  ];

  const filtered = customerDisputes.filter(
    (d) =>
      d.id.toLowerCase().includes(search.toLowerCase()) ||
      d.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      d.item.toLowerCase().includes(search.toLowerCase())
  );

  const activeDispute = customerDisputes.find((d) => d.id === selectedCaseId) || customerDisputes[0];

  return (
    <>
      <PortalNavBar
        label={language === 'es' ? 'Portal Cliente' : 'Customer Portal'}
        badgeClass="bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
      />
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 transition-colors">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-slate-200/80 dark:border-slate-800/80 gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-slate-900/5 dark:bg-slate-800 p-1.5 flex items-center justify-center border border-slate-200/80 dark:border-slate-700/80 shadow-xs shrink-0">
            <Image
              src="/logo.png"
              alt="Tally-Ho Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#0070BA]/10 text-[#0070BA] dark:bg-[#0070BA]/20 dark:text-[#0070BA] border border-[#0070BA]/25 flex items-center gap-1.5">
                <IconPayPal size={12} />
                <span>{language === 'es' ? 'Portal del Cliente' : 'Customer Portal'}</span>
              </span>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                {user?.email || 'customer-buyer@example.com'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {t('portal.title')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {t('portal.subtitle')}
            </p>
          </div>
        </div>

        {/* Switch Role Pill for Demo & Testing */}
        <div className="flex items-center gap-2 bg-white dark:bg-slate-800/80 p-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 px-2">
            {language === 'es' ? 'Modo de Prueba:' : 'Demo Role:'}
          </span>
          <button
            onClick={() => switchRole('admin')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              user?.role === 'admin'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <IconShield size={12} />
            <span>Admin</span>
          </button>
          <button
            onClick={() => switchRole('customer')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              user?.role === 'customer'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <IconUser size={12} />
            <span>{language === 'es' ? 'Cliente' : 'Customer'}</span>
          </button>
        </div>
      </div>

      {/* Transparency Guarantee Strip */}
      <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/80 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
          <IconCheckCircle size={18} />
        </div>
        <div className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
          <strong className="font-semibold">{language === 'es' ? 'Transparencia de Disputa Garantizada:' : 'Fair & Transparent Dispute Guarantee:'}</strong>{' '}
          {t('portal.transparencyNotice')}
        </div>
      </div>

      {/* Main Grid: Left Cases List / Right Dispute Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Search & My Cases List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('portal.searchPlaceholder')}
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
            />
            <div className="absolute left-3 top-3 text-slate-400 pointer-events-none">
              <IconSearch size={14} />
            </div>
          </div>

          <div className="space-y-3">
            {filtered.map((dispute) => {
              const isSelected = dispute.id === selectedCaseId;
              return (
                <div
                  key={dispute.id}
                  onClick={() => setSelectedCaseId(dispute.id)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 border-purple-500 shadow-md ring-2 ring-purple-500/20'
                      : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-xs text-slate-900 dark:text-white">
                      {dispute.id}
                    </span>
                    <span className="font-mono font-bold text-xs text-slate-900 dark:text-white">
                      {dispute.amount}
                    </span>
                  </div>

                  <h3 className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {dispute.item}
                  </h3>

                  <div className="mt-3 flex items-center justify-between text-[11px]">
                    <span className="text-purple-600 dark:text-purple-400 font-medium">
                      ● {dispute.status}
                    </span>
                    <span className="text-slate-400 font-mono">{dispute.date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Case Transparent Details & Timeline (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {activeDispute && (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
              <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-xs text-slate-400 block font-mono">
                    {activeDispute.orderNumber}
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                    {activeDispute.item}
                  </h2>
                </div>
                <span className="text-base sm:text-lg font-black font-mono text-slate-900 dark:text-white">
                  {activeDispute.amount}
                </span>
              </div>

              {/* Claims & Merchant Finding side by side */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                    {language === 'es' ? 'Tu Reclamo Registrado en PayPal:' : 'Your Claim on PayPal:'}
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                    &quot;{activeDispute.buyerClaim}&quot;
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 block mb-1 flex items-center gap-1">
                    <IconSearch size={11} />
                    <span>{language === 'es' ? 'Evidencia Verificada del Comerciante:' : 'Merchant Verified Evidence:'}</span>
                  </span>
                  <p className="text-xs text-purple-900 dark:text-purple-200 font-medium leading-relaxed">
                    {activeDispute.merchantVerification}
                  </p>
                  <p className="mt-2 text-[11px] font-mono text-purple-700 dark:text-purple-300 bg-white/70 dark:bg-slate-900/70 p-2 rounded-lg border border-purple-200 dark:border-purple-900 flex items-center gap-1.5">
                    <IconPackage size={12} />
                    <span>{activeDispute.carrierProof}</span>
                  </p>
                </div>
              </div>

              {/* Progress Timeline */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                  {language === 'es' ? 'Cronología de Resolución' : 'Resolution Timeline'}
                </h3>
                <div className="space-y-3">
                  {activeDispute.timeline.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs">
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          item.done
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                        }`}
                      >
                        {item.done ? <IconCheck size={11} /> : idx + 1}
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 flex-1">
                        {item.step}
                      </span>
                      <span className="font-mono text-[11px] text-slate-400">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Resolution Actions */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() =>
                    alert(
                      language === 'es'
                        ? 'Confirmación enviada a PayPal. La disputa se actualizará amistosamente.'
                        : 'Confirmation delivered to PayPal. The dispute status will update amicably.'
                    )
                  }
                  className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <IconCheck size={13} />
                  <span>{language === 'es' ? 'Aceptar Solución Amistosa' : 'Accept Resolution'}</span>
                </button>
                <Link
                  href={`/disputes/${activeDispute.id}`}
                  className="w-full sm:w-auto px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 transition-colors text-center flex items-center justify-center gap-1.5"
                >
                  <IconEye size={13} />
                  <span>{language === 'es' ? 'Ver Evidencia Completa' : 'Inspect Full Evidence'}</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
    </>
  );
}
