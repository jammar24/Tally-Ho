'use client';

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';
import {
  IconShield,
  IconLock,
  IconKey,
  IconBolt,
  IconTrendingUp,
  IconDollar,
  IconTime,
  IconUser,
  IconStore,
  IconCheck,
  IconArrowRight,
} from '@/components/Icons';

export default function AdminDashboardPage() {
  const { t, language, user, switchRole, verifyAdminCredentials } = useApp();
  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = verifyAdminCredentials(emailInput, passInput);
    if (!ok) {
      setErrorMsg(true);
    } else {
      setErrorMsg(false);
    }
  };

  const handleDemoFill = () => {
    setEmailInput('admin@disputedesk.ai');
    setPassInput('Admin2026!');
    verifyAdminCredentials('admin@disputedesk.ai', 'Admin2026!');
  };

  const urgentCases = [
    {
      id: 'PP-D-7001',
      buyer: 'john.doe@example.com',
      reason: 'Item Not Received (INR)',
      amount: '$149.99 USD',
      daysLeft: '2 days left',
      status: 'WAITING_FOR_SELLER_RESPONSE',
      confidence: '98% (Proof of delivery verified via FedEx)',
    },
    {
      id: 'PP-D-7004',
      buyer: 'sarah.m@example.com',
      reason: 'Not As Described (SNAD)',
      amount: '$220.00 USD',
      daysLeft: '3 days left',
      status: 'WAITING_FOR_SELLER_RESPONSE',
      confidence: '84% (Return label offered, serial matched)',
    },
    {
      id: 'PP-D-7005',
      buyer: 'david.k@example.com',
      reason: 'Duplicate Transaction',
      amount: '$75.00 USD',
      daysLeft: '5 days left',
      status: 'WAITING_FOR_SELLER_RESPONSE',
      confidence: '95% (Distinct order IDs confirmed)',
    },
  ];

  // If user is not logged in as Admin, show the protected Admin Gate
  if (user?.role !== 'admin') {
    return (
      <main className="max-w-md mx-auto px-4 py-16 transition-colors">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 shadow-lg space-y-6">
          <div className="text-center space-y-2.5">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-100 dark:border-indigo-900 shadow-xs">
              <IconShield size={24} />
            </div>
            <span className="inline-block px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
              {t('admin.login.badge')}
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t('admin.login.title')}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              {t('admin.login.subtitle')}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t('admin.login.emailLabel')}
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="admin@disputedesk.ai"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 outline-hidden"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t('admin.login.passLabel')}
              </label>
              <input
                type="password"
                value={passInput}
                onChange={(e) => setPassInput(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 outline-hidden"
                required
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-600 dark:text-rose-400 font-medium p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800">
                {t('admin.login.error')}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2"
            >
              <IconLock size={14} />
              <span>{t('admin.login.btn')}</span>
            </button>
          </form>

          {/* Authorized Credentials Card for Hackathon Evaluators */}
          <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <IconKey size={12} className="text-amber-500" />
              <span>{language === 'es' ? 'Credenciales de Acceso Autorizadas' : 'Authorized Access Credentials'}</span>
            </span>
            <div className="text-xs font-mono space-y-1 text-slate-700 dark:text-slate-300">
              <p>Email: <span className="font-bold text-blue-600 dark:text-blue-400">admin@disputedesk.ai</span></p>
              <p>Password: <span className="font-bold text-emerald-600 dark:text-emerald-400">Admin2026!</span></p>
            </div>
            <button
              type="button"
              onClick={handleDemoFill}
              className="w-full mt-2 py-2 bg-slate-200/80 dark:bg-slate-700/80 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <IconBolt size={13} className="text-amber-500" />
              <span>{language === 'es' ? 'Autocompletar e Iniciar Sesión' : 'Auto-Fill & Enter'}</span>
            </button>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              ← {language === 'es' ? 'Volver al Inicio' : 'Return to Home'}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Authorized Admin View
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 transition-colors">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-slate-200/80 dark:border-slate-800/80 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 flex items-center gap-1.5">
              <IconShield size={12} />
              <span>{language === 'es' ? 'Sesión de Administrador Ejecutiva' : 'Executive Admin Session'}</span>
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              {user?.email}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t('admin.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t('admin.subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => switchRole('merchant')}
            className="px-3.5 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-medium border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <IconStore size={14} className="text-blue-500" />
            <span>{language === 'es' ? 'Modo Comerciante' : 'Merchant Mode'}</span>
          </button>
          <button
            onClick={() => switchRole('customer')}
            className="px-3.5 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-medium border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <IconUser size={14} className="text-purple-500" />
            <span>{language === 'es' ? 'Modo Cliente' : 'Customer Mode'}</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {t('admin.stats.winRate')}
            </span>
            <span className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm border border-emerald-100 dark:border-emerald-900">
              <IconTrendingUp size={16} />
            </span>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-3 font-mono">
            91.4%
          </p>
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-1 inline-block">
            +6.2% {language === 'es' ? 'vs período anterior' : 'vs prior period'}
          </span>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {t('admin.stats.recovered')}
            </span>
            <span className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm border border-blue-100 dark:border-blue-900">
              <IconDollar size={16} />
            </span>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-3 font-mono">
            $1,420.50
          </p>
          <span className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-1 inline-block">
            USD {language === 'es' ? 'retenido a favor' : 'retained in merchant favor'}
          </span>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {t('admin.stats.avgTime')}
            </span>
            <span className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-sm border border-purple-100 dark:border-purple-900">
              <IconTime size={16} />
            </span>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-3 font-mono">
            4.2 min
          </p>
          <span className="text-xs font-medium text-purple-600 dark:text-purple-400 mt-1 inline-block">
            {language === 'es' ? 'vs 48 hrs manual' : 'vs 48 hrs manual response'}
          </span>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {t('admin.stats.hilRate')}
            </span>
            <span className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm border border-amber-100 dark:border-amber-900">
              <IconUser size={16} />
            </span>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-3 font-mono">
            100%
          </p>
          <span className="text-xs font-medium text-amber-600 dark:text-amber-400 mt-1 inline-block">
            {language === 'es' ? '0 envíos automáticos ciegos' : '0 blind automated submissions'}
          </span>
        </div>
      </section>

      {/* AI Guardrails Control & Policy */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <IconShield size={18} className="text-indigo-600 dark:text-indigo-400" />
              <span>{t('admin.agentControl.title')}</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {language === 'es'
                ? 'Políticas activas impuestas a nivel de runtime para garantizar seguridad jurídica y técnica.'
                : 'Hard runtime limits enforced on all autonomous agent evidence actions.'}
            </p>
          </div>
          <span className="px-3 py-0.5 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-semibold rounded-full border border-emerald-200 dark:border-emerald-800">
            ● {language === 'es' ? 'Guardrails Activos' : 'Guardrails Enforced'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-1">
            <div className="flex items-center justify-between font-bold">
              <span className="text-slate-700 dark:text-slate-200">
                {language === 'es' ? 'Límite de Pasos por Disputa' : 'Step Cap Per Case'}
              </span>
              <span className="font-mono text-blue-600 dark:text-blue-400">Max 6 steps</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
              {language === 'es'
                ? 'Evita bucles infinitos en llamadas a herramientas de análisis.'
                : 'Prevents infinite tool call loops. Hard limit at 6 steps.'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-1">
            <div className="flex items-center justify-between font-bold">
              <span className="text-slate-700 dark:text-slate-200">
                {language === 'es' ? 'Candado PayPal Sandbox' : 'Sandbox Network Lock'}
              </span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400">Strict Lock</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
              {language === 'es'
                ? 'Cualquier petición que no contenga "sandbox" en la URL es bloqueada en runtime.'
                : 'Hard runtime block if PAYPAL_API_BASE does not contain "sandbox".'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-1">
            <div className="flex items-center justify-between font-bold">
              <span className="text-slate-700 dark:text-slate-200">
                {language === 'es' ? 'Verificación Anti-Alucinación' : 'Zero Hallucination Filter'}
              </span>
              <span className="font-mono text-purple-600 dark:text-purple-400">100% Cited</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
              {language === 'es'
                ? 'Todo número, fecha o dirección debe coincidir carácter por carácter con el PDF.'
                : 'Any date, amount or tracking not cited in raw PDF text layer is rejected.'}
            </p>
          </div>
        </div>
      </section>

      {/* Urgent Action Required Queue */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {t('admin.urgent.title')}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {language === 'es'
                ? 'Disputas que requieren respuesta del comerciante para no perder el caso por omisión.'
                : 'Pending cases approaching PayPal deadline requiring merchant review and submission.'}
            </p>
          </div>
          <Link
            href="/disputes"
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>{language === 'es' ? 'Ver todas las disputas en la bandeja' : 'View all disputes in inbox'}</span>
            <IconArrowRight size={13} />
          </Link>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {urgentCases.map((c) => (
            <div
              key={c.id}
              className="py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-xs">
                    {c.id}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1">
                    <IconTime size={11} />
                    <span>{c.daysLeft}</span>
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {c.buyer}
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {c.reason}
                </p>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                  <IconCheck size={12} />
                  <span>{c.confidence}</span>
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <span className="font-mono font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  {c.amount}
                </span>
                <Link
                  href={`/disputes/${c.id}`}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <IconBolt size={14} />
                  <span>{language === 'es' ? 'Revisar y Aprobar' : 'Review & Approve'}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
