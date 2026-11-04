'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
      <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xl mb-4">
        ⚠️
      </div>
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
        Something went wrong / Algo salió mal
      </h2>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-md font-mono bg-slate-100 dark:bg-slate-800 p-2 rounded border border-slate-200 dark:border-slate-700">
        {error.message || 'An unexpected error occurred.'}
      </p>
      <button
        onClick={() => reset()}
        className="mt-5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
      >
        Try again / Reintentar
      </button>
    </div>
  );
}

