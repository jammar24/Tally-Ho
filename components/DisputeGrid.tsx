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
      width: 150,
      cellRenderer: (params: any) => {
        return (
          <Link
            href={`/disputes/${params.value}`}
            className="font-mono font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline flex items-center gap-1"
          >
            {params.value}
          </Link>
        );
      },
    },
    {
      headerName: language === 'es' ? 'Motivo del Reclamo' : 'Dispute Reason',
      field: 'reason',
      flex: 1.5,
      minWidth: 230,
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
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${item.bg} ${item.textCol}`}>
            {language === 'es' ? item.es : item.en}
          </span>
        );
      },
    },
    {
      headerName: language === 'es' ? 'Estado' : 'Status',
      field: 'status',
      flex: 1.2,
      minWidth: 200,
      cellRenderer: (params: any) => {
        const isActionRequired = params.value === 'WAITING_FOR_SELLER_RESPONSE';
        return (
          <div className="flex items-center gap-1.5 h-full">
            <span
              className={`w-2 h-2 rounded-full ${isActionRequired ? 'bg-amber-500 animate-pulse' : 'bg-slate-400'}`}
            />
            <span className={`text-xs font-medium ${isActionRequired ? 'text-amber-900 dark:text-amber-300 font-semibold' : 'text-slate-600 dark:text-slate-400'}`}>
              {isActionRequired
                ? language === 'es'
                  ? 'Acción Requerida (Vendedor)'
                  : 'Action Required (Seller)'
                : params.value.replace(/_/g, ' ')}
            </span>
          </div>
        );
      },
    },
    {
      headerName: language === 'es' ? 'Monto Disputado' : 'Disputed Amount',
      field: 'amount',
      width: 150,
      valueGetter: (params) => {
        return `$${params.data?.amount.value} ${params.data?.amount.currency}`;
      },
      cellClass: 'font-mono font-medium text-slate-800 dark:text-slate-200 text-right',
      headerClass: 'text-right',
    },
    {
      headerName: language === 'es' ? 'Fecha Límite' : 'Due Date',
      field: 'sellerResponseDueDate',
      width: 150,
      cellRenderer: (params: any) => {
        if (!params.value) return <span className="text-slate-400 text-xs">None</span>;
        const date = new Date(params.value);
        return (
          <span className="text-xs font-mono text-slate-600 dark:text-slate-400">
            {date.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        );
      },
    },
    {
      headerName: language === 'es' ? 'Origen' : 'Origin',
      field: 'source',
      width: 140,
      cellRenderer: (params: any) => {
        const isLive = params.value === 'paypal';
        return (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
              isLive
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700'
            }`}
          >
            {isLive ? '🟢 Live Sandbox' : 'Demo data'}
          </span>
        );
      },
    },
    {
      headerName: language === 'es' ? 'Acción' : 'Action',
      width: 150,
      sortable: false,
      filter: false,
      cellRenderer: (params: any) => {
        return (
          <Link
            href={`/disputes/${params.data.id}`}
            className="inline-flex items-center justify-center px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded shadow-xs transition-colors"
          >
            {language === 'es' ? '⚡ Analizar' : '⚡ Analyze Case'}
          </Link>
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

  return (
    <div
      className={`${gridTheme} w-full rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs bg-white dark:bg-slate-900 transition-colors`}
      style={{ height: 520 }}
    >
      <AgGridReact
        rowData={disputes}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        domLayout="normal"
      />
    </div>
  );
}
