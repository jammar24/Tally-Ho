'use client';

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/context/AppContext';
import Link from 'next/link';
import {
  IconLock,
  IconStore,
  IconUser,
  IconShield,
  IconLogOut,
  IconCheck,
} from '@/components/Icons';

export default function AuthPage() {
  const { t, language, user, login } = useApp();
  const [roleInput, setRoleInput] = useState<UserRole>('merchant');
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');

  const handleCustomConnect = (e: React.FormEvent) => {
    e.preventDefault();
    login(
      emailInput || (roleInput === 'merchant' ? 'merchant-test@sandbox.paypal.com' : 'buyer-test@sandbox.paypal.com'),
      nameInput || (roleInput === 'merchant' ? 'Sandbox Merchant Store' : 'Sandbox Consumer Buyer'),
      roleInput
    );
  };

  const handleQuickPreset = (role: 'merchant' | 'customer' | 'admin') => {
    if (role === 'merchant') {
      setNameInput('Apex Gear Store');
      setEmailInput('merchant-apex@sandbox.paypal.com');
      setRoleInput('merchant');
      login('merchant-apex@sandbox.paypal.com', 'Apex Gear Store (Merchant)', 'merchant');
    } else if (role === 'customer') {
      setNameInput('John Doe (Buyer)');
      setEmailInput('buyer-john@sandbox.paypal.com');
      setRoleInput('customer');
      login('buyer-john@sandbox.paypal.com', 'John Doe (Buyer)', 'customer');
    } else {
      setNameInput('System Administrator');
      setEmailInput('admin@disputedesk.ai');
      setRoleInput('admin');
      login('admin@disputedesk.ai', 'System Administrator (Executive)', 'admin');
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 transition-colors">
      <div className="pb-6 border-b border-slate-200/80 dark:border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 mb-3 shadow-xs">
          <IconLock size={12} className="text-amber-600 dark:text-amber-400" />
          <span>{language === 'es' ? 'Autenticación PayPal Sandbox' : 'PayPal Sandbox Authentication'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {t('auth.title')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
          {t('auth.subtitle')}
        </p>
      </div>

      {/* One-Click Connect with PayPal Sandbox Bar */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
              PayPal Developer Sandbox
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold mt-1">
              {language === 'es' ? 'Conectar Cuenta de PayPal Sandbox' : 'Connect PayPal Sandbox Account'}
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
              {language === 'es'
                ? 'Elige un perfil para evaluar la app al instante o ingresa tus credenciales de desarrollador PayPal.'
                : 'Select an instant sandbox profile for evaluation or connect your custom PayPal developer keys.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
            <button
              onClick={() => handleQuickPreset('merchant')}
              className="px-4 py-2.5 bg-[#0070ba] hover:bg-[#005ea6] text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <IconStore size={14} />
              <span>{language === 'es' ? 'Entrar como Comerciante' : 'Connect as Merchant'}</span>
            </button>
            <button
              onClick={() => handleQuickPreset('customer')}
              className="px-4 py-2.5 bg-[#003087] hover:bg-[#00256c] text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <IconUser size={14} />
              <span>{language === 'es' ? 'Entrar como Cliente' : 'Connect as Customer (Buyer)'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Active Session Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {language === 'es' ? 'Sesión Actual' : 'Active Session'}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                user
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${user ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}
              />
              {user ? t('auth.status.signedIn') : t('auth.status.signedOut')}
            </span>
          </div>

          {user ? (
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/60">
                <span className="text-slate-500 dark:text-slate-400">{t('auth.account')}:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{user.name}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/60">
                <span className="text-slate-500 dark:text-slate-400">Email:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">{user.email}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/60 items-center">
                <span className="text-slate-500 dark:text-slate-400">{t('auth.role')}:</span>
                <span
                  className={`font-semibold px-2 py-0.5 rounded-full text-[11px] ${
                    user.role === 'admin'
                      ? 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300'
                      : user.role === 'merchant'
                        ? 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300'
                        : 'bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300'
                  }`}
                >
                  {user.role === 'admin' ? 'Executive Admin' : user.role === 'merchant' ? 'Store Merchant' : 'Customer (Buyer)'}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 dark:text-slate-400">{t('auth.mode')}:</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                  PayPal Sandbox Live Lock
                </span>
              </div>

              {/* Direct Route Links based on Role */}
              <div className="pt-4 flex flex-col gap-2">
                {user.role === 'admin' ? (
                  <Link
                    href="/admin"
                    className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl text-center shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <IconShield size={14} />
                    <span>{language === 'es' ? 'Ir al Panel de Admin' : 'Go to Admin Dashboard'}</span>
                  </Link>
                ) : user.role === 'merchant' ? (
                  <Link
                    href="/merchant"
                    className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl text-center shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <IconStore size={14} />
                    <span>{language === 'es' ? 'Ir al Portal Comerciante' : 'Go to Merchant Hub'}</span>
                  </Link>
                ) : (
                  <Link
                    href="/portal"
                    className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-xl text-center shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <IconUser size={14} />
                    <span>{language === 'es' ? 'Ir a Mi Portal de Cliente' : 'Go to Customer Portal'}</span>
                  </Link>
                )}

                <Link
                  href="/out"
                  className="w-full py-2.5 px-4 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900 text-rose-700 dark:text-rose-300 text-xs font-semibold rounded-xl border border-rose-200 dark:border-rose-800 text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <IconLogOut size={14} />
                  <span>{t('auth.btn.signout')}</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center text-xs text-slate-500 dark:text-slate-400">
              <p className="mb-4">
                {language === 'es'
                  ? 'Actualmente estás en modo invitado. Conecta con PayPal Sandbox para comenzar.'
                  : 'You are currently in guest mode. Connect with PayPal Sandbox to begin.'}
              </p>
              <button
                onClick={() => login()}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-xs transition-colors"
              >
                {t('auth.btn.signin')}
              </button>
            </div>
          )}
        </div>

        {/* Custom Credentials Form */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {language === 'es' ? 'Credenciales Personalizadas' : 'Custom Sandbox Credentials'}
          </h3>

          <form onSubmit={handleCustomConnect} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                {language === 'es' ? 'Rol en la Plataforma' : 'Account Role'}
              </label>
              <select
                value={roleInput}
                onChange={(e) => setRoleInput(e.target.value as UserRole)}
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              >
                <option value="merchant">Merchant (Store Owner / Seller)</option>
                <option value="customer">Customer (Buyer / Client)</option>
                <option value="admin">Executive Admin (Restricted)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                {language === 'es' ? 'Nombre o Razón Social' : 'Name or Store Name'}
              </label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                placeholder="My Store LLC"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                {language === 'es' ? 'Email Sandbox de PayPal' : 'PayPal Sandbox Email'}
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                placeholder="merchant@sandbox.paypal.com"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-xs"
            >
              {language === 'es' ? 'Guardar y Conectar Sesión' : 'Save & Connect Session'}
            </button>
          </form>

          <p className="text-[11px] text-slate-400 leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
            <IconLock size={12} className="shrink-0" />
            <span>{t('auth.notice')}</span>
          </p>
        </div>
      </div>
    </main>
  );
}
