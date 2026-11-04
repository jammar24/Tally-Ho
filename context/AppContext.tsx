'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from './translations';

export type UserRole = 'admin' | 'merchant' | 'customer';

export interface User {
  name: string;
  email: string;
  role: UserRole;
  isSandbox: boolean;
  storeName?: string;
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  user: User | null;
  login: (email?: string, name?: string, role?: UserRole) => void;
  switchRole: (role: UserRole) => void;
  verifyAdminCredentials: (email: string, pass: string) => boolean;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');
  const [user, setUser] = useState<User | null>({
    name: 'ElectroTech Goods (Sandbox Store)',
    email: 'merchant-test@sandbox.paypal.com',
    role: 'merchant',
    isSandbox: true,
    storeName: 'ElectroTech Goods (Sandbox Store)',
  });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('disputedesk_lang') as Language;
      if (savedLang === 'en' || savedLang === 'es') {
        setLanguageState(savedLang);
      }

      const savedTheme = localStorage.getItem('disputedesk_theme') as 'light' | 'dark';
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setThemeState(savedTheme);
        if (savedTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setThemeState('dark');
        document.documentElement.classList.add('dark');
      }

      const savedUser = localStorage.getItem('disputedesk_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('disputedesk_lang', lang);
    } catch {}
  };

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setThemeState(next);
    try {
      localStorage.setItem('disputedesk_theme', next);
    } catch {}
    if (next === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const login = (
    email = 'merchant-test@sandbox.paypal.com',
    name = 'ElectroTech Goods (Sandbox Store)',
    role: UserRole = 'merchant'
  ) => {
    const newUser: User = {
      name,
      email,
      role,
      isSandbox: true,
      storeName: role === 'merchant' ? 'ElectroTech Goods (Sandbox Store)' : undefined,
    };
    setUser(newUser);
    try {
      localStorage.setItem('disputedesk_user', JSON.stringify(newUser));
    } catch {}
  };

  const verifyAdminCredentials = (emailInput: string, passInput: string): boolean => {
    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanPass = passInput.trim();
    if (cleanEmail === 'admin@disputedesk.ai' && cleanPass === 'Admin2026!') {
      const adminUser: User = {
        name: 'System Administrator (Executive)',
        email: 'admin@disputedesk.ai',
        role: 'admin',
        isSandbox: true,
      };
      setUser(adminUser);
      try {
        localStorage.setItem('disputedesk_user', JSON.stringify(adminUser));
      } catch {}
      return true;
    }
    return false;
  };

  const switchRole = (newRole: UserRole) => {
    if (newRole === 'admin') {
      login('admin@disputedesk.ai', 'System Administrator (Executive)', 'admin');
      return;
    }
    if (newRole === 'merchant') {
      login('merchant-test@sandbox.paypal.com', 'ElectroTech Goods (Sandbox Store)', 'merchant');
      return;
    }
    if (newRole === 'customer') {
      login('buyer-test@sandbox.paypal.com', 'Alex Johnson (Customer)', 'customer');
      return;
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('disputedesk_user');
    } catch {}
  };

  const t = (key: string): string => {
    const dict = translations[language] || translations.en;
    return (dict as any)[key] || key;
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        theme,
        toggleTheme,
        user,
        login,
        switchRole,
        verifyAdminCredentials,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// SSR-safe defaults when context is not available (e.g., during static prerendering)
const ssrDefaults: AppContextType = {
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
  theme: 'light',
  toggleTheme: () => {},
  user: null,
  login: () => {},
  switchRole: () => {},
  verifyAdminCredentials: () => false,
  logout: () => {},
};

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    return ssrDefaults;
  }
  return context;
}
