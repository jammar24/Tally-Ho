'use client';

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';

export default function OrdersPage() {
  const { language, theme } = useApp();
  const [loading, setLoading] = useState(false);
  const [orderResult, setOrderResult] = useState<any | null>(null);

  const handleCreateOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders', { method: 'POST' });
      const data = await res.json();
      setOrderResult(data);
    } catch (e: any) {
      setOrderResult({ error: e.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6 transition-colors">
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {language === 'es' ? 'Órdenes del Sandbox de PayPal' : 'PayPal Sandbox Orders'}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {language === 'es'
            ? 'Crea y simula transacciones de checkout directamente en la API de Orders v2 del Sandbox de PayPal.'
            : 'Create and simulate sandbox checkout transactions directly via PayPal Orders v2 API.'}
        </p>
      </div>

      <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            {language === 'es' ? 'Simular Orden de Checkout' : 'Simulate Merchant Checkout Order'}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            {language === 'es'
              ? 'Llama a POST /v2/checkout/orders con una orden de $120.00 USD en el Sandbox de PayPal.'
              : 'Calls POST /v2/checkout/orders with a $120.00 USD purchase order on the PayPal Sandbox.'}
          </p>
        </div>

        <button
          onClick={handleCreateOrder}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
        >
          {loading
            ? (language === 'es' ? 'Creando Orden en PayPal...' : 'Creating Order on PayPal...')
            : (language === 'es' ? '+ Crear Orden en Sandbox' : '+ Create Sandbox Order')}
        </button>

        {orderResult && (
          <div className="mt-4 p-4 rounded-lg bg-slate-900 dark:bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto border border-slate-700">
            <pre>{JSON.stringify(orderResult, null, 2)}</pre>
          </div>
        )}
      </div>
    </main>
  );
}
