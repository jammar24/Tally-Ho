'use client';

import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import { Dispute } from '@/lib/schemas';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

interface DisputeGridProps {
  disputes: Dispute[];
}

export function DisputeGrid({ disputes }: DisputeGridProps) {
  const { theme, language } = useApp();

  const columnDefs = useMemo<ColDef<Dispute>[]>(() => [
    {
      headerName: language === 'es' ? 'ID Disputa' : 'Dispute ID',
      field: 'id',
      width: 125,
      minWidth: 115,
      cellRenderer: (params: any) => {
        return (
          <div className="flex items-center h-full">
            <Link
              href={`/disputes/${params.value}`}
              className="font-mono font-bold text-xs text-[#0070BA] dark:text-blue-400 hover:text-[#003087] dark:hover:text-blue-300 hover:underline flex items-center gap-1"
            >
              {params.value}
            </Link>
          </div>
        );
      },
    },
    {
      headerName: language === 'es' ? 'Motivo' : 'Reason',
      field: 'reason',
      flex: 1.3,
      minWidth: 175,
      cellRenderer: (params: any) => {
        const labels: Record<string, { en: string; es: string; bg: string; textCol: string }> = {
          MERCHANDISE_OR_SERVICE_NOT_RECEIVED: {
            en: 'Item Not Received (INR)',
            es: 'Artículo No Recibido (INR)',
            bg: 'bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800',
            textCol: 'text-rose-700 dark:text-rose-300',
          },
          MERCHANDISE_OR_SERVICE_NOT_AS_DESCRIBED: {
            en: 'Not As Described (SNAD)',
            es: 'No Coincide con Descripción',
            bg: 'bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800',
            textCol: 'text-amber-700 dark:text-amber-300',
          },
          DUPLICATE_TRANSACTION: {
            en: 'Duplicate Transaction',
            es: 'Transacción Duplicada',
            bg: 'bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800',
            textCol: 'text-purple-700 dark:text-purple-300',
          },
          CREDIT_NOT_PROCESSED: {
            en: 'Credit Not Processed',
            es: 'Reembolso No Procesado',
            bg: 'bg-sky-50 dark:bg-sky-950/50 border-sky-200 dark:border-sky-800',
            textCol: 'text-sky-700 dark:text-sky-300',
          },
        };
        const item = labels[params.value] || {
          en: params.value.replace(/_/g, ' '),
          es: params.value.replace(/_/g, ' '),
          bg: 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700',
          textCol: 'text-slate-700 dark:text-slate-300',
        };
        return (
          <div className="flex items-center h-full">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${item.bg} ${item.textCol} shadow-2xs whitespace-nowrap`}>
              {language === 'es' ? item.es : item.en}
            </span>
          </div>
        );
      },
    },
    {
      headerName: language === 'es' ? 'Estado' : 'Status',
      field: 'status',
      flex: 1.1,
      minWidth: 160,
      cellRenderer: (params: any) => {
        const isActionRequired = params.value === 'WAITING_FOR_SELLER_RESPONSE';
        return (
          <div className="flex items-center gap-2 h-full">
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${isActionRequired ? 'bg-amber-500 animate-pulse' : 'bg-slate-400'}`}
            />
            <span className={`text-xs font-semibold whitespace-nowrap ${isActionRequired ? 'text-amber-800 dark:text-amber-300' : 'text-slate-600 dark:text-slate-400'}`}>
              {isActionRequired
                ? (language === 'es' ? 'Acción Requerida' : 'Action Required')
                : params.value.replace(/_/g, ' ')}
            </span>
          </div>
        );
      },
    },
    {
      headerName: language === 'es' ? 'Monto' : 'Amount',
      field: 'amount',
      width: 110,
      minWidth: 100,
      valueGetter: (params) => {
        return `$${params.data?.amount.value} ${params.data?.amount.currency}`;
      },
      cellRenderer: (params: any) => (
        <div className="flex items-center justify-end h-full">
          <span className="font-mono font-bold text-xs text-slate-800 dark:text-slate-200">
            {params.value}
          </span>
        </div>
      ),
      headerClass: 'text-right',
    },
    {
      headerName: language === 'es' ? 'Fecha Límite' : 'Due Date',
      field: 'sellerResponseDueDate',
      width: 120,
      minWidth: 110,
      cellRenderer: (params: any) => {
        if (!params.value) return <span className="text-slate-400 text-xs">—</span>;
        const date = new Date(params.value);
        return (
          <div className="flex items-center h-full">
            <span className="text-xs font-mono text-slate-600 dark:text-slate-400 whitespace-nowrap">
              {date.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
        );
      },
    },
    {
      headerName: language === 'es' ? 'Origen' : 'Origin',
      field: 'source',
      width: 135,
      minWidth: 125,
      cellRenderer: (params: any) => {
        const isLive = params.value === 'paypal';
        const label = isLive
          ? (language === 'es' ? 'Sandbox Real' : 'Live Sandbox')
          : 'Demo data';
        return (
          <div className="flex items-center h-full pr-1">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border transition-all shadow-2xs whitespace-nowrap shrink-0 ${
                isLive
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                  : 'bg-[#0070BA]/10 text-[#0070BA] dark:bg-[#0070BA]/20 dark:text-blue-300 border-[#0070BA]/30'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                  isLive ? 'bg-emerald-500 animate-pulse' : 'bg-[#0070BA]'
                }`}
              />
              <span>{label}</span>
            </span>
          </div>
        );
      },
    },
    {
      headerName: language === 'es' ? 'Acción' : 'Action',
      width: 125,
      minWidth: 115,
      sortable: false,
      filter: false,
      cellRenderer: (params: any) => {
        return (
          <div className="flex items-center justify-center h-full">
            <Link
              href={`/disputes/${params.data?.id || params.value}`}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1 bg-[#0070BA] hover:bg-[#005EA6] active:bg-[#003087] text-white text-[11px] font-bold rounded-full shadow-xs hover:shadow-md transition-all whitespace-nowrap group"
            >
              <span>{language === 'es' ? 'Analizar' : 'Analyze'}</span>
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-x-0.5 transition-transform"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        );
      },
    },
  ], [language]);

  const defaultColDef = useMemo<ColDef>(() => ({
    sortable: true,
    filter: true,
    resizable: true,
  }), []);

  const gridTheme = theme === 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz';

  // Mobile card view — shown below md breakpoint
  const MobileCards = () => (
    <div className="space-y-3 md:hidden">
      {disputes.map((d) => {
        const isINR = d.reason === 'MERCHANDISE_OR_SERVICE_NOT_RECEIVED';
        const isSNAD = d.reason === 'MERCHANDISE_OR_SERVICE_NOT_AS_DESCRIBED';
        const isDup = d.reason === 'DUPLICATE_TRANSACTION';
        const reasonLabel = isINR
          ? (language === 'es' ? 'Artículo No Recibido (INR)' : 'Item Not Received (INR)')
          : isSNAD
            ? (language === 'es' ? 'No Coincide con Descripción' : 'Not As Described (SNAD)')
            : isDup
              ? (language === 'es' ? 'Transacción Duplicada' : 'Duplicate Transaction')
              : d.reason.replace(/_/g, ' ');
        const reasonBg = isINR
          ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300'
          : isSNAD
            ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300'
            : isDup
              ? 'bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300'
              : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300';
        const dueDate = d.sellerResponseDueDate
          ? new Date(d.sellerResponseDueDate).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          : '—';

        const isLive = d.source === 'paypal';

        return (
          <div key={d.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3 hover:border-[#0070BA]/50 transition-all">
            <div className="flex items-start justify-between gap-2">
              <Link href={`/disputes/${d.id}`} className="font-mono font-bold text-[#0070BA] dark:text-blue-400 hover:underline text-sm">
                {d.id}
              </Link>
              <div className="flex items-center gap-1.5 shrink-0">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                    isLive
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                      : 'bg-[#0070BA]/10 text-[#0070BA] dark:bg-[#0070BA]/20 dark:text-blue-300 border-[#0070BA]/25'
                  }`}
                >
                  <span className={`w-1 h-1 rounded-full ${isLive ? 'bg-emerald-500' : 'bg-[#0070BA]'}`} />
                  <span>{isLive ? 'PayPal' : (language === 'es' ? 'Demo' : 'Demo')}</span>
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${reasonBg}`}>
                  {reasonLabel}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs py-1 border-y border-slate-100 dark:border-slate-800/80">
              <span className="text-slate-500 dark:text-slate-400">{language === 'es' ? 'Monto' : 'Amount'}</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white text-right">${d.amount.value} {d.amount.currency}</span>
              <span className="text-slate-500 dark:text-slate-400">{language === 'es' ? 'Fecha Límite' : 'Due Date'}</span>
              <span className="font-mono text-slate-700 dark:text-slate-300 text-right">{dueDate}</span>
              <span className="text-slate-500 dark:text-slate-400">{language === 'es' ? 'Estado' : 'Status'}</span>
              <span className="font-medium text-amber-700 dark:text-amber-300 text-right flex items-center justify-end gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span>
                  {d.status === 'WAITING_FOR_SELLER_RESPONSE'
                    ? (language === 'es' ? 'Acción Requerida' : 'Action Required')
                    : d.status.replace(/_/g, ' ')}
                </span>
              </span>
            </div>
            <Link
              href={`/disputes/${d.id}`}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-[#0070BA] hover:bg-[#005EA6] active:bg-[#003087] text-white text-xs font-bold rounded-full shadow-xs hover:shadow-md transition-all group"
            >
              <span>{language === 'es' ? 'Analizar y Defender Disputa' : 'Analyze & Defend Case'}</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-x-0.5 transition-transform"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="w-full space-y-3">
      {/* Mobile card list */}
      <MobileCards />

      {/* Desktop AG Grid — hidden on mobile */}
      <div
        className={`${gridTheme} hidden md:block w-full rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs bg-white dark:bg-slate-900 transition-colors`}
        style={{ height: 520 }}
      >
        <AgGridReact
          rowData={disputes}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
          domLayout="normal"
          onGridReady={(params) => {
            params.api.sizeColumnsToFit();
          }}
          onGridSizeChanged={(params) => {
            params.api.sizeColumnsToFit();
          }}
        />
      </div>
    </div>
  );
}
