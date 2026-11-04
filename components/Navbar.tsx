'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage, theme, toggleTheme, user, logout, t } = useApp();

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/disputes', label: t('nav.inbox') },
    { href: '/insights', label: t('nav.insights') },
    { href: '/orders', label: t('nav.orders') },
    { href: '/about', label: t('nav.about') },
    { href: '/docs', label: t('nav.docs') },
  ];

  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Left Nav */}
        <div className="flex items-center gap-6 lg:gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black flex items-center justify-center text-sm shadow-xs">
              DD
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white text-lg tracking-tight">
                {t('nav.brand')}
              </span>
              <span className="ml-2 text-[10px] font-semibold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                {t('nav.agent')}
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
                      : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Actions: Lang, Theme & Auth */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700 text-xs">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded font-semibold transition-colors ${
                language === 'en'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('es')}
              className={`px-2 py-1 rounded font-semibold transition-colors ${
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
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-sm transition-colors"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Auth / Ruta Out */}
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/auth"
                className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 text-xs"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-700 dark:text-slate-300 font-medium truncate max-w-[120px]">
                  {user.name}
                </span>
              </Link>
              <Link
                href="/out"
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900 border border-rose-200 dark:border-rose-800 transition-colors"
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
        </div>
      </div>
    </header>
  );
}
