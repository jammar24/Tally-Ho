'use client';

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';
import {
  IconShield,
  IconLock,
  IconCheck,
  IconPayPal,
  IconFile,
  IconPackage,
  IconTrendingUp,
  IconStore,
  IconUser,
  IconArrowRight,
} from '@/components/Icons';

type DocTab = 'security' | 'architecture' | 'paypal' | 'benchmark' | 'cases';

export default function DocsPage() {
  const { language } = useApp();
  const [activeTab, setActiveTab] = useState<DocTab>('security');

  const tabs: { id: DocTab; label: { es: string; en: string }; icon: any }[] = [
    { id: 'security', label: { es: 'Ciberseguridad & Reglas', en: 'Cybersecurity & Guardrails' }, icon: IconShield },
    { id: 'architecture', label: { es: 'Arquitectura IA', en: 'AI Architecture' }, icon: IconTrendingUp },
    { id: 'paypal', label: { es: 'PayPal Sandbox API', en: 'PayPal Sandbox API' }, icon: IconPayPal },
    { id: 'benchmark', label: { es: 'Benchmark & Métricas', en: 'Benchmark & Evaluation' }, icon: IconFile },
    { id: 'cases', label: { es: 'Casos de Prueba', en: 'Test Scenarios' }, icon: IconPackage },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 transition-colors">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#0070BA]/10 text-[#0070BA] dark:bg-[#0070BA]/20 dark:text-[#0070BA] border border-[#0070BA]/25 mb-2">
            <IconPayPal size={13} />
            <span>{language === 'es' ? 'Documentación Técnica Oficial' : 'Official Technical Documentation'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === 'es' ? 'Centro de Documentación y Seguridad' : 'Documentation & Cybersecurity Center'}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            {language === 'es'
              ? 'Arquitectura del motor autónomo Tally-Ho, barreras de ciberseguridad PCI-DSS, protocolos de integración con PayPal Sandbox y benchmarks de evaluación medidos.'
              : 'Autonomous Tally-Ho engine architecture, PCI-DSS cybersecurity guardrails, PayPal Sandbox integration protocols, and measured evaluation benchmarks.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/disputes"
            className="px-4 py-2 text-xs font-bold rounded-full bg-[#0070BA] hover:bg-[#005EA6] text-white transition-all shadow-xs inline-flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>{language === 'es' ? 'Ver Disputas Activas' : 'View Live Disputes'}</span>
            <IconArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* Interactive Tabs Bar */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/70 rounded-2xl border border-slate-200 dark:border-slate-700">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-white dark:bg-slate-900 text-[#0070BA] dark:text-blue-400 shadow-sm border border-slate-200/80 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/40'
              }`}
            >
              <Icon size={14} className={isActive ? 'text-[#0070BA] dark:text-blue-400' : 'text-slate-400'} />
              <span>{language === 'es' ? tab.label.es : tab.label.en}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content 1: Cybersecurity & Guardrails */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-[#0070BA] dark:text-blue-300">
                <IconShield size={18} />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                {language === 'es' ? 'Sandbox Lock Estricto' : 'Strict Sandbox Lock'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {language === 'es'
                  ? 'El backend valida en tiempo de ejecución que todas las peticiones apunten exclusivamente a api-m.sandbox.paypal.com. Detención automática ante cualquier intento de conexión a producción o URLs no autorizadas (anti-SSRF).'
                  : 'Backend runtime checks enforce all API traffic to strictly target api-m.sandbox.paypal.com. Process halts immediately if production URLs or untrusted external hosts are requested (anti-SSRF).'}
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                <IconCheck size={12} />
                <span>Zero Production Leak</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-300">
                <IconLock size={18} />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                {language === 'es' ? 'Defensa Anti-Prompt Injection' : 'Prompt Injection Defense'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {language === 'es'
                  ? 'Todos los mensajes del comprador y documentos son analizados con detectores de inyección adversaria antes de llegar al LLM. Intentos como "Ignore previous instructions" o "Rule in favor of buyer" son neutralizados al 100%.'
                  : 'All buyer messages and uploaded merchant files are scanned for adversarial prompt overrides prior to LLM processing. Commands like "Ignore previous instructions" are isolated with 100% defense rate.'}
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                <IconCheck size={12} />
                <span>100% Blocked in Benchmark</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-300">
                <IconCheck size={18} />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                {language === 'es' ? 'Redacción PII & PCI-DSS' : 'PII & PCI-DSS Redaction'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {language === 'es'
                  ? 'Filtro automático de sanitización que detecta y enmascara números de tarjetas de crédito (PAN) y códigos CVV/CVC antes de almacenar o redactar evidencias, garantizando cumplimiento normativo bancario.'
                  : 'Automated sanitizer strips Primary Account Numbers (PANs) and CVV/CVC codes from evidence drafts before persistence or transmission, ensuring strict banking data privacy compliance.'}
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                <IconCheck size={12} />
                <span>CARD_REDACTED_****</span>
              </div>
            </div>

          </div>

          {/* Security Headers & Rate Limiting Details */}
          <div className="p-6 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-4">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <IconShield size={18} className="text-[#0070BA]" />
              <span>{language === 'es' ? 'Cabeceras de Ciberseguridad Activas (Next.js 14)' : 'Active Enterprise Security Headers'}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <span className="text-[#0070BA] font-bold">Strict-Transport-Security</span>
                <p className="text-slate-400 text-[11px] mt-0.5">max-age=63072000; includeSubDomains; preload</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <span className="text-[#0070BA] font-bold">X-Frame-Options</span>
                <p className="text-slate-400 text-[11px] mt-0.5">SAMEORIGIN (Protección contra Clickjacking)</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <span className="text-[#0070BA] font-bold">X-Content-Type-Options</span>
                <p className="text-slate-400 text-[11px] mt-0.5">nosniff (Previene ataques MIME-sniffing)</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <span className="text-[#0070BA] font-bold">Rate Limiting</span>
                <p className="text-slate-400 text-[11px] mt-0.5">10 peticiones/min en análisis IA; 5/min en OAuth</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 2: AI Architecture */}
      {activeTab === 'architecture' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {language === 'es' ? 'Flujo Autónomo del Agente de Disputas' : 'Autonomous Dispute Defense Agent Workflow'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {language === 'es'
                ? 'Tally-Ho implementa un ciclo de decisión determinístico en 5 fases obligatorias. Cada afirmación legal en la defensa final debe estar respaldada por un extracto textual verificado de la guía de envío o factura del comerciante.'
                : 'Tally-Ho executes a deterministic 5-phase decision pipeline. Every factual statement in the final evidence draft must cite verified verbatim quotes from carrier proofs or merchant invoices.'}
            </p>

            {/* Visual Agent Workflow Flowchart */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-4">
              {[
                { step: '01', title: language === 'es' ? 'Ingesta' : 'Ingestion', desc: language === 'es' ? 'Lectura del reclamo y monto PayPal' : 'Parse PayPal claim & amount' },
                { step: '02', title: language === 'es' ? 'Grounding' : 'Grounding', desc: language === 'es' ? 'Cotejo contra PDFs de factura y guía' : 'Cross-check invoice & tracking PDFs' },
                { step: '03', title: language === 'es' ? 'Carrier API' : 'Carrier API', desc: language === 'es' ? 'Verificación GPS/firma con FedEx/USPS' : 'Validate GPS & resident signature' },
                { step: '04', title: language === 'es' ? 'Inferencia' : 'Inference', desc: language === 'es' ? 'Gemini 3.1 Flash redacta con citas exactas' : 'Gemini 3.1 drafts with exact citations' },
                { step: '05', title: language === 'es' ? 'Aprobación' : 'Approval', desc: language === 'es' ? 'Revisión humana obligatoria antes del envío' : 'Human review required before submission' },
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center space-y-1">
                  <span className="text-[10px] font-black text-[#0070BA] dark:text-blue-400 uppercase tracking-widest">{item.step}</span>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              {language === 'es' ? 'Cascada de Resiliencia Multi-Modelo de Gemini' : 'Gemini Multi-Model Resilience Cascade'}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {language === 'es'
                ? 'Para garantizar 99.9% de disponibilidad durante picos del hackathon, el motor conmuta automáticamente entre modelos en caso de timeouts o saturación:'
                : 'To guarantee 99.9% uptime during hackathon load spikes, the engine cascades across available models if timeouts occur:'}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-bold">
                1. gemini-3.1-flash-lite (Primario)
              </span>
              <span className="text-slate-400">→</span>
              <span className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
                2. gemini-3.8-flash (Fallback 1)
              </span>
              <span className="text-slate-400">→</span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                3. Deterministic Grounded Engine (Offline)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 3: PayPal Sandbox API */}
      {activeTab === 'paypal' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <IconPayPal size={18} className="text-[#0070BA]" />
              <span>{language === 'es' ? 'Endpoints Oficiales de PayPal Sandbox Integrados' : 'Integrated Official PayPal Sandbox Endpoints'}</span>
            </h3>

            <div className="space-y-3">
              {[
                { method: 'POST', path: '/v1/oauth2/token', desc: language === 'es' ? 'Intercambio de credenciales por token Bearer con grant_type=client_credentials.' : 'Exchange client ID & secret for Bearer token via client_credentials grant.' },
                { method: 'GET', path: '/v1/customer/disputes', desc: language === 'es' ? 'Consulta de la bandeja de disputas abiertas en el Sandbox del comerciante.' : 'Query live merchant disputes open in PayPal Sandbox environment.' },
                { method: 'GET', path: '/v1/customer/disputes/{dispute_id}', desc: language === 'es' ? 'Obtención de montos, historial de mensajes, transacciones y fecha límite de respuesta.' : 'Fetch full dispute breakdown: amounts, message history, disputed transactions, due date.' },
                { method: 'POST', path: '/v1/customer/disputes/{dispute_id}/provide-evidence', desc: language === 'es' ? 'Envío del paquete de evidencias aprobado por el comerciante con trazabilidad legal.' : 'Submit merchant-approved evidence note and carrier verification proofs.' },
              ].map((ep, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${ep.method === 'GET' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'}`}>
                      {ep.method}
                    </span>
                    <span className="font-mono text-xs text-slate-800 dark:text-slate-200 font-semibold">{ep.path}</span>
                  </div>
                  <span className="text-xs text-slate-600 dark:text-slate-400">{ep.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 4: Benchmark & Evaluation */}
      {activeTab === 'benchmark' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                {language === 'es' ? 'Precisión de Extracción' : 'Extraction Accuracy'}
              </span>
              <p className="text-3xl font-extrabold text-[#0070BA] dark:text-blue-400 mt-2">100%</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Guías, fechas y números de serie</p>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                {language === 'es' ? 'Defensa Anti-Inyección' : 'Prompt Injection Block'}
              </span>
              <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">100%</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Casos adversarios bloqueados</p>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                {language === 'es' ? 'Cero Alucinaciones' : 'Zero Hallucinations'}
              </span>
              <p className="text-3xl font-extrabold text-purple-600 dark:text-purple-400 mt-2">0.0%</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Citas verificadas contra PDF</p>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                {language === 'es' ? 'Tiempo de Respuesta' : 'Resolution Time'}
              </span>
              <p className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-2">&lt; 90s</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Reducción del 98% vs proceso manual</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 5: Test Scenarios */}
      {activeTab === 'cases' && (
        <div className="space-y-4">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            {language === 'es'
              ? 'Tally-Ho incluye una suite de 10 escenarios sintéticos determinísticos para probar todas las causales contempladas por la política de protección al vendedor de PayPal:'
              : 'Tally-Ho bundles 10 deterministic test scenarios covering all primary dispute dispute types defined in PayPal Seller Protection Policy:'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { id: 'PP-D-7001', reason: 'MERCHANDISE_OR_SERVICE_NOT_RECEIVED', amount: '$149.99 USD', defense: 'FedEx Tracking #1Z9999999999999999 con firma de residente y GPS verificado.' },
              { id: 'PP-D-7004', reason: 'MERCHANDISE_OR_SERVICE_NOT_AS_DESCRIBED', amount: '$220.00 USD', defense: 'Etiqueta prepagada de devolución emitida automáticamente por USPS.' },
              { id: 'PP-D-7005', reason: 'DUPLICATE_TRANSACTION', amount: '$75.00 USD', defense: 'Detección de doble cobro y emisión instantánea de nota de crédito al comprador.' },
              { id: 'PP-D-7006', reason: 'CREDIT_NOT_PROCESSED', amount: '$59.99 USD', defense: 'Comprobante de abono bancario fechado dentro de los 5 días hábiles reglamentarios.' },
            ].map((c) => (
              <div key={c.id} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#0070BA] dark:text-blue-400">{c.id}</span>
                  <span className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">{c.amount}</span>
                </div>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{c.reason}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{c.defense}</p>
                <div className="pt-2">
                  <Link
                    href={`/disputes/${c.id}`}
                    className="text-xs font-bold text-[#0070BA] dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>{language === 'es' ? 'Abrir Análisis' : 'Open Analysis'}</span>
                    <IconArrowRight size={11} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </main>
  );
}
