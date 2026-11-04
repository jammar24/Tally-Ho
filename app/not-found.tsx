import Link from 'next/link';
import { IconSearch } from '@/components/Icons';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mb-4 border border-slate-200 dark:border-slate-700">
        <IconSearch size={28} />
      </div>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Page Not Found</h2>
      <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-6 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
      >
        Go to Home
      </Link>
    </div>
  );
}
