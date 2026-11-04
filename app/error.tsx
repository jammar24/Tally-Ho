'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
      <h2 className="text-xl font-bold text-slate-900">Something went wrong</h2>
      <p className="text-xs text-slate-500 mt-1">{error.message || 'An error occurred.'}</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold"
      >
        Try again
      </button>
    </div>
  );
}

