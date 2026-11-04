'use client';

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';

export default function AuthPage() {
  const { user, login, logout, t, language } = useApp();
  const [emailInput, setEmailInput] = useState('merchant-test@sandbox.paypal.com');
  const [nameInput, setNameInput] = useState('Demo Merchant Store');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    login(emailInput, nameInput);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 transition-colors">
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {t('auth.title')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          {t('auth.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Session Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {language === 'es' ? 'Estado de la Sesión' : 'Session Status'}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                user
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${user ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
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
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/60">
                <span className="text-slate-500 dark:text-slate-400">{t('auth.role')}:</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">{user.role}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 dark:text-slate-400">{t('auth.mode')}:</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">PayPal Sandbox</span>
              </div>

              <div className="pt-4 flex flex-col gap-2">
                <button
                  onClick={logout}
                  className="w-full py-2.5 px-4 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900 text-rose-700 dark:text-rose-300 text-xs font-bold rounded-xl border border-rose-200 dark:border-rose-800 transition-colors"
                >
                  🚪 {t('auth.btn.signout')}
                </button>
                <Link
                  href="/disputes"
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl text-center shadow-xs transition-colors"
                >
                  ⚡ {t('home.hero.cta.inbox')}
                </Link>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center text-xs text-slate-500 dark:text-slate-400">
              <p className="mb-4">
                {language === 'es'
                  ? 'Actualmente estás en modo invitado. Inicia sesión para conectar con el perfil del comerciante.'
                  : 'You are currently in guest mode. Sign in to connect with the merchant profile.'}
              </p>
              <button
                onClick={() => login()}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs transition-colors"
              >
                {t('auth.btn.signin')}
              </button>
            </div>
          )}
        </div>

        {/* Change Credentials / Sign In Form */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {t('auth.switch')}
          </h3>

          <form onSubmit={handleSignIn} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                {language === 'es' ? 'Nombre del Comercio' : 'Merchant Store Name'}
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
              className="w-full py-2.5 px-4 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-xs"
            >
              {t('auth.btn.signin')}
            </button>
          </form>

          <p className="text-[11px] text-slate-400 leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800">
            🔒 {t('auth.notice')}
          </p>
        </div>
      </div>
    </main>
  );
}

