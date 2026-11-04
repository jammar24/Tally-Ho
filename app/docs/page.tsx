'use client';

export const dynamic = 'force-dynamic';

import React from 'react';
import { useApp } from '@/context/AppContext';

export default function DocsPage() {
  const { language, theme } = useApp();

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 transition-colors">
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {language === 'es' ? 'Documentación y Benchmark de Evaluación' : 'Documentation & Evaluation Benchmark'}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {language === 'es'
            ? 'Especificaciones técnicas, resultados de benchmark medidos y divulgación arquitectónica real vs demo.'
            : 'Technical specifications, measured benchmark results, and real vs demo architectural disclosure.'}
        </p>
      </div>

      {/* Benchmark Results */}
      <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-2">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {language === 'es' ? 'Resultados de Evaluación Medidos' : 'Measured Evaluation Results'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'es'
                ? 'Probado en 10 escenarios de disputa sintéticos (n=10). Verificado determinísticamente.'
                : 'Tested on 10 synthetic dispute scenarios (n=10). Verified deterministically via test suite.'}
            </p>
          </div>
          <span className="text-xs bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-full font-semibold whitespace-nowrap">
            {language === 'es' ? 'Conjunto sintético pequeño (n=10)' : 'Small synthetic set (n=10); not a general benchmark'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium uppercase">
              {language === 'es' ? 'Precisión de Extracción' : 'Extraction Accuracy'}
            </span>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">100%</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
              {language === 'es' ? 'Tracking, transportista, fechas' : 'Tracking, carrier, dates'}
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium uppercase">
              {language === 'es' ? 'Verificación de Citas Textuales' : 'Text Quote Verification'}
            </span>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">100%</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
              {language === 'es' ? 'Coincidencia en capa de PDF' : 'Matched in PDF layer'}
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium uppercase">
              {language === 'es' ? 'Defensa Contra Inyección' : 'Prompt Injection Defense'}
            </span>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
              {language === 'es' ? '100% Bloqueado' : '100% Blocked'}
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
              {language === 'es' ? 'Casos #7 y #8 aislados' : 'Cases #7 & #8 safely isolated'}
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium uppercase">
              {language === 'es' ? 'Rechazo de Borradores Fabricados' : 'Fabricated Draft Rejection'}
            </span>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">100%</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
              {language === 'es' ? 'Cero tokens no fundamentados' : 'Zero ungrounded tokens'}
            </p>
          </div>
        </div>
      </section>

      {/* Real vs Demo Component Table */}
      <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          {language === 'es' ? 'Estado de Componentes: Real vs Demo' : 'Component Status: Real vs Demo Data'}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-2.5 px-3">{language === 'es' ? 'Componente' : 'System Component'}</th>
                <th className="py-2.5 px-3">{language === 'es' ? 'Estado Operativo' : 'Operational State'}</th>
                <th className="py-2.5 px-3">{language === 'es' ? 'Descripción' : 'Description'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="py-2.5 px-3 font-semibold">OAuth 2.0 &amp; Orders</td>
                <td className="py-2.5 px-3"><span className="text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded font-mono">Live Sandbox</span></td>
                <td className="py-2.5 px-3">{language === 'es' ? 'Integración HTTPS directa con endpoints del Sandbox de PayPal.' : 'Direct HTTPS integration with PayPal Sandbox endpoints.'}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold">{language === 'es' ? 'Listado y Detalle de Disputas' : 'Dispute Listing & Detail'}</td>
                <td className="py-2.5 px-3"><span className="text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded font-mono">Live / Demo Hybrid</span></td>
                <td className="py-2.5 px-3">{language === 'es' ? 'Consulta sandbox; usa disputas demo si no hay casos activos del comprador.' : 'Queries sandbox; falls back to realistic demo disputes if no buyer cases are active.'}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold">{language === 'es' ? 'Envío de Evidencia' : 'Evidence Submission'}</td>
                <td className="py-2.5 px-3"><span className="text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded font-mono">Live / Dry-Run</span></td>
                <td className="py-2.5 px-3">{language === 'es' ? 'Live para disputas sandbox; Dry-Run validado para casos demo.' : 'Live for sandbox buyer disputes; validated Dry-Run for demo cases.'}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold">{language === 'es' ? 'Documentos del Comerciante' : 'Merchant Documents'}</td>
                <td className="py-2.5 px-3"><span className="text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono">{language === 'es' ? 'Datos Demo Sintéticos' : 'Synthetic Demo Data'}</span></td>
                <td className="py-2.5 px-3">{language === 'es' ? 'Facturas, recibos de envío y logs de chat generados con marca DEMO DATA.' : 'Generated invoices, shipping receipts, and chat logs with DEMO DATA watermark.'}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold">{language === 'es' ? 'Motor de Análisis IA' : 'AI Analysis Engine'}</td>
                <td className="py-2.5 px-3"><span className="text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded font-mono">Live / Cached Fallback</span></td>
                <td className="py-2.5 px-3">{language === 'es' ? 'Llamadas API en vivo; usa análisis pre-generados si no hay clave API.' : 'Live API calls; switches to cached pre-generated analyses if key is omitted.'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Safety Guardrails */}
      <section className="bg-slate-900 dark:bg-slate-950 text-slate-100 rounded-xl p-6 space-y-4 border border-slate-800">
        <h2 className="text-base font-bold text-white">
          {language === 'es' ? 'Barreras Arquitectónicas Rígidas' : 'Hard Architectural Guardrails'}
        </h2>
        <ul className="text-xs space-y-2 text-slate-300 list-disc list-inside">
          <li><strong>{language === 'es' ? 'Aislamiento Sandbox:' : 'Sandbox Isolation:'}</strong> {language === 'es' ? 'Chequeo estricto en tiempo de ejecución detiene el proceso si PAYPAL_API_BASE no contiene "sandbox".' : 'Strict runtime check halts process if PAYPAL_API_BASE does not include "sandbox".'}</li>
          <li><strong>{language === 'es' ? 'Cero Exposición de Secretos:' : 'Zero Secret Exposure:'}</strong> {language === 'es' ? 'Credenciales nunca enviadas al cliente, consola o bundle.' : 'Credentials never sent to client, logged to console, or included in client bundle.'}</li>
          <li><strong>{language === 'es' ? 'Aprobación Humana Obligatoria:' : 'Mandatory Human Approval:'}</strong> {language === 'es' ? 'La IA tiene cero acceso de escritura a las APIs de PayPal; envío solo tras confirmación del usuario.' : 'The AI agent has zero write access to PayPal APIs; submission happens only after explicit user confirmation.'}</li>
          <li><strong>{language === 'es' ? 'Pasos del Agente Acotados:' : 'Bounded Agent Steps:'}</strong> {language === 'es' ? 'Análisis limitado a 6 pasos de herramienta y 60 segundos de timeout.' : 'Analysis hard-capped at 6 tool steps and 60-second execution timeout.'}</li>
        </ul>
      </section>
    </main>
  );
}
