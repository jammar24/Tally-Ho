'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { IconShield, IconLock, IconSun, IconMoon, IconStore, IconUser } from './Icons';

export function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage, theme, toggleTheme, user, switchRole, t } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/disputes', label: t('nav.inbox') },
    { href: '/merchant', label: t('nav.merchant') },
    { href: '/portal', label: t('nav.portal') },
    { href: '/insights', label: t('nav.insights') },
    { href: '/orders', label: t('nav.orders') },
    { href: '/about', label: t('nav.about') },
    { href: '/docs', label: t('nav.docs') },
  ];

  return (
    <header className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-[#0B0F17]/95 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Left Nav */}
        <div className="flex items-center gap-6 lg:gap-8">
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-8 h-8 rounded-lg bg-blue-600 dark:bg-blue-500 text-white font-bold flex items-center justify-center text-xs tracking-wider shadow-xs group-hover:bg-blue-700 transition-colors">
              TH
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 dark:text-white text-base tracking-tight whitespace-nowrap">
                {t('nav.brand')}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 whitespace-nowrap inline-flex items-center">
                {t('nav.agent')}
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Actions: Role Switcher, Admin Protected Tab, Lang, Theme & Auth */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Dedicated Protected Admin Tab */}
          <Link
            href="/admin"
            className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
              pathname === '/admin'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : user?.role === 'admin'
                  ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100'
                  : 'bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
            }`}
            title={
              language === 'es'
                ? 'Acceso Administrativo Ejecutivo (Requiere Credenciales)'
                : 'Executive Admin Access (Credentials Required)'
            }
          >
            {user?.role === 'admin' ? (
              <IconShield size={13} className="text-indigo-600 dark:text-indigo-400" />
            ) : (
              <IconLock size={13} className="text-slate-500 dark:text-slate-400" />
            )}
            <span>Admin</span>
          </Link>

          {/* Quick Role Switcher Pill */}
          {user && (
            <button
              onClick={() => switchRole(user.role === 'customer' ? 'merchant' : 'customer')}
              title={
                language === 'es'
                  ? 'Clic para alternar entre vista de Comerciante y Cliente'
                  : 'Click to switch between Merchant and Customer view'
              }
              className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                user.role === 'merchant'
                  ? 'bg-blue-50/70 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/80'
                  : user.role === 'admin'
                    ? 'bg-indigo-50/70 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/80'
                    : 'bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              {user.role === 'merchant' ? (
                <IconStore size={13} className="text-blue-600 dark:text-blue-400 shrink-0" />
              ) : user.role === 'admin' ? (
                <IconShield size={13} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
              ) : (
                <IconUser size={13} className="text-slate-600 dark:text-slate-300 shrink-0" />
              )}
              <span className="font-semibold">
                {user.role === 'merchant' ? 'Merchant' : user.role === 'admin' ? 'Admin' : 'Customer'}
              </span>
              <span className="text-[10px] text-slate-400">/</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">switch</span>
            </button>
          )}

          {/* Language Switcher */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700 text-xs">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded font-medium transition-colors ${
                language === 'en'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('es')}
              className={`px-2 py-0.5 rounded font-medium transition-colors ${
                language === 'es'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              ES
            </button>
          </div>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors inline-flex items-center justify-center"
          >
            {theme === 'dark' ? <IconSun size={15} /> : <IconMoon size={15} />}
          </button>

          {/* Auth / Ruta Out */}
          {user ? (
            <div className="flex items-center gap-1.5">
              <Link
                href="/auth"
                className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 hover:border-slate-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="font-medium truncate max-w-[100px]">{user.name}</span>
              </Link>
              <Link
                href="/out"
                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800/80 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200 dark:border-slate-700 hover:border-rose-200 transition-colors"
              >
                {t('nav.out')}
              </Link>
            </div>
          ) : (
            <Link
              href="/auth"
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-xs transition-colors"
            >
              {t('nav.auth')}
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F17] px-4 py-3 space-y-1 shadow-lg">
          {user && (
            <div className="pb-2 mb-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">
                {user.name} ({user.role})
              </span>
              <button
                onClick={() => {
                  switchRole(user.role === 'customer' ? 'merchant' : 'customer');
                }}
                className="font-medium px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300"
              >
                Switch to {user.role === 'customer' ? 'Merchant' : 'Customer'}
              </button>
            </div>
          )}
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold bg-indigo-50/70 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300"
            >
              <span className="inline-flex items-center gap-2">
                <IconLock size={14} />
                <span>Admin Dashboard</span>
              </span>
              <span className="text-xs">→</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
