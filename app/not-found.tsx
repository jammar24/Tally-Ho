import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
      <span className="text-5xl mb-4">🔍</span>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Page Not Found</h2>
      <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-6 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
      >
        Go to Home
      </Link>
    </div>
  );
}
