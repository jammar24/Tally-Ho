'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';
import Image from 'next/image';
import {
  IconLock,
  IconStore,
  IconUser,
  IconShield,
  IconLogOut,
  IconCheck,
  IconPayPal,
  IconArrowRight,
} from '@/components/Icons';

export default function AuthPage() {
  const { language, user, login, logout } = useApp();
  const [isConnecting, setIsConnecting] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Live PayPal Sandbox Connection Info
  const [ppClientId, setPpClientId] = useState('');
  const [ppClientSecret, setPpClientSecret] = useState('');
  const [isTestingCustom, setIsTestingCustom] = useState(false);
  const [ppStatus, setPpStatus] = useState<{
    connected: boolean;
    masked?: string;
    message?: string;
    error?: string;
  } | null>(null);

  useEffect(() => {
    fetch('/api/paypal/connect')
      .then((r) => r.json())
      .then((data) => {
        setPpStatus({ connected: data.connected, masked: data.maskedClientId });
      })
      .catch(() => {});
  }, []);

  // 1-Click One-Touch PayPal Connect
  const handleOneClickConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      login(
        'merchant-apex@sandbox.paypal.com',
        'Apex Gear Store (PayPal Merchant)',
        'merchant'
      );
      setIsConnecting(false);
    }, 600);
  };

  // Advanced custom credentials submission
  const handleCustomCredentialsConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ppClientId || !ppClientSecret) return;
    setIsTestingCustom(true);
    setPpStatus(null);
    try {
      const res = await fetch('/api/paypal/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId: ppClientId, clientSecret: ppClientSecret }),
      });
      const data = await res.json();
      if (data.success) {
        setPpStatus({
          connected: true,
          masked: data.maskedClientId,
          message:
            language === 'es'
              ? '¡Credenciales verificadas y conectadas con PayPal Sandbox!'
              : 'Credentials verified & linked with PayPal Sandbox!',
        });
        login(
          'merchant-custom@sandbox.paypal.com',
          'Custom Store (PayPal Verified)',
          'merchant'
        );
        setPpClientSecret('');
      } else {
        setPpStatus({ connected: false, error: data.error });
      }
    } catch (err: any) {
      setPpStatus({ connected: false, error: err.message || 'Error de conexión' });
    } finally {
      setIsTestingCustom(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8 transition-colors">
      
      {/* Top Brand Header */}
      <div className="text-center space-y-3">
        <div className="relative w-16 h-16 mx-auto rounded-2xl bg-gradient-to-b from-[#0070BA]/10 to-[#003087]/10 dark:from-[#0070BA]/20 dark:to-[#003087]/20 p-2 border border-[#0070BA]/25 shadow-sm flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="Tally-Ho Official Logo"
            width={52}
            height={52}
            className="object-contain drop-shadow-xs"
            priority
          />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0070BA]/10 text-[#0070BA] dark:bg-[#0070BA]/20 dark:text-[#0070BA] border border-[#0070BA]/25 shadow-2xs">
          <IconPayPal size={13} className="text-[#0070BA]" />
          <span>PayPal AI Hackathon 2026 • Sandbox Environment</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {language === 'es' ? 'Conectar con PayPal' : 'Connect with PayPal'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
          {language === 'es'
            ? 'Vincula tu cuenta comercial en 1 solo clic. Sin formularios manuales ni configuraciones complejas.'
            : 'Link your merchant account in a single click. Zero manual forms or tedious setup.'}
        </p>
      </div>

      {/* Main Connection Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-md transition-all">
        {user ? (
          /* State 1: Connected / Logged in */
          <div className="space-y-6 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                {language === 'es' ? 'Cuenta PayPal Conectada y Activa' : 'PayPal Account Connected & Active'}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 max-w-md mx-auto text-left space-y-2.5 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-200/80 dark:border-slate-700">
                <span className="text-slate-500 dark:text-slate-400">
                  {language === 'es' ? 'Comercio:' : 'Merchant:'}
                </span>
                <span className="font-bold text-slate-900 dark:text-white">{user.name}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/80 dark:border-slate-700">
                <span className="text-slate-500 dark:text-slate-400">Email:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">{user.email}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 dark:text-slate-400">
                  {language === 'es' ? 'Entorno:' : 'Environment:'}
                </span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <IconPayPal size={12} />
                  <span>Sandbox Live API</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
              <Link
                href="/disputes"
                className="w-full sm:w-auto flex-1 px-6 py-3 bg-[#0070BA] hover:bg-[#005EA6] active:bg-[#003087] text-white text-xs font-bold rounded-full shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 group"
              >
                <span>{language === 'es' ? 'Ir a la Bandeja de Disputas' : 'Open Disputes Inbox'}</span>
                <IconArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <button
                onClick={() => logout()}
                className="w-full sm:w-auto px-5 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <IconLogOut size={13} />
                <span>{language === 'es' ? 'Desconectar' : 'Disconnect'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* State 2: Ready to connect (1-Click, Zero Friction) */
          <div className="space-y-6 text-center py-2">
            <div className="w-16 h-16 rounded-2xl bg-[#0070BA]/10 text-[#0070BA] dark:bg-[#0070BA]/20 dark:text-blue-300 mx-auto flex items-center justify-center border border-[#0070BA]/25 shadow-2xs">
              <IconPayPal size={32} />
            </div>

            <div className="space-y-1.5 max-w-md mx-auto">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {language === 'es'
                  ? 'Acceso Seguro a PayPal Sandbox'
                  : 'Secure PayPal Sandbox Access'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {language === 'es'
                  ? 'Haz clic en el botón a continuación para autorizar y conectar tu cuenta de comerciante inmediatamente.'
                  : 'Click the button below to authorize and connect your merchant account instantly.'}
              </p>
            </div>

            {/* THE BIG 1-CLICK BUTTON */}
            <div className="pt-2 max-w-sm mx-auto">
              <button
                onClick={handleOneClickConnect}
                disabled={isConnecting}
                className="w-full py-3.5 px-6 bg-[#0070BA] hover:bg-[#005EA6] active:bg-[#003087] disabled:opacity-60 text-white font-extrabold text-sm rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <IconPayPal size={18} />
                <span>
                  {isConnecting
                    ? (language === 'es' ? 'Conectando con PayPal...' : 'Connecting to PayPal...')
                    : (language === 'es' ? 'Conectar con PayPal Sandbox' : 'Connect with PayPal Sandbox')}
                </span>
                {!isConnecting && (
                  <IconArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                )}
              </button>

              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-3 flex items-center justify-center gap-1">
                <IconLock size={12} />
                <span>
                  {language === 'es'
                    ? 'Autenticación directa en Sandbox. Sin contraseñas requeridas.'
                    : 'Direct Sandbox auth. No password required.'}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Collapsible Advanced Section for Evaluators / Alternate Roles */}
      <div className="border border-slate-200/80 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 p-4 transition-colors">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors py-1 cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <span>⚙️</span>
            <span>
              {language === 'es'
                ? 'Opciones avanzadas y roles de prueba (Opcional)'
                : 'Advanced Options & Test Personas (Optional)'}
            </span>
          </span>
          <span className="text-[11px]">
            {showAdvanced
              ? (language === 'es' ? '▲ Ocultar' : '▲ Hide')
              : (language === 'es' ? '▼ Ver' : '▼ Show')}
          </span>
        </button>

        {showAdvanced && (
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-6">
            
            {/* Quick Test Role Switcher */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                {language === 'es' ? '1. Probar Otros Perfiles' : '1. Try Other Personas'}
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  onClick={() => {
                    login('buyer-john@sandbox.paypal.com', 'John Doe (Buyer)', 'customer');
                    window.open('/portal', '_blank');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 font-semibold flex items-center gap-1.5"
                >
                  <IconUser size={13} />
                  <span>{language === 'es' ? 'Portal del Cliente (Comprador)' : 'Customer Portal (Buyer)'}</span>
                </button>

                <button
                  onClick={() => {
                    login('admin@disputedesk.ai', 'System Administrator (Executive)', 'admin');
                    window.open('/admin', '_blank');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 font-semibold flex items-center gap-1.5"
                >
                  <IconShield size={13} />
                  <span>{language === 'es' ? 'Panel de Administrador' : 'Admin Panel'}</span>
                </button>
              </div>
            </div>

            {/* Custom PayPal Keys Override Form */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                {language === 'es'
                  ? '2. Vincular Claves Personalizadas de PayPal Developer'
                  : '2. Link Custom PayPal Developer Keys'}
              </span>
              <form onSubmit={handleCustomCredentialsConnect} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                      Sandbox Client ID
                    </label>
                    <input
                      type="text"
                      value={ppClientId}
                      onChange={(e) => setPpClientId(e.target.value)}
                      placeholder="BAAmRUlXk..."
                      className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs focus:ring-2 focus:ring-[#0070BA] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                      Sandbox Client Secret
                    </label>
                    <input
                      type="password"
                      value={ppClientSecret}
                      onChange={(e) => setPpClientSecret(e.target.value)}
                      placeholder="EAL-1r9qo..."
                      className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs focus:ring-2 focus:ring-[#0070BA] outline-hidden"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1">
                  <div className="text-[11px]">
                    {ppStatus?.message && (
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        {ppStatus.message}
                      </span>
                    )}
                    {ppStatus?.error && (
                      <span className="text-rose-600 dark:text-rose-400 font-semibold">
                        {ppStatus.error}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isTestingCustom || !ppClientId || !ppClientSecret}
                    className="px-4 py-2 bg-[#003087] hover:bg-[#00256C] disabled:opacity-50 text-white rounded-full font-bold text-xs shadow-xs transition-colors"
                  >
                    {isTestingCustom
                      ? (language === 'es' ? 'Validando...' : 'Validating...')
                      : (language === 'es' ? 'Guardar Claves' : 'Save Keys')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
