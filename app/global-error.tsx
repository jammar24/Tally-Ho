'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h2 className="text-xl font-bold text-slate-900">Application Error</h2>
        <p className="text-xs text-slate-500 mt-1">{error.message || 'Fatal error'}</p>
        <button
          onClick={() => reset()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold"
        >
          Reset Application
        </button>
      </body>
    </html>
  );
}

