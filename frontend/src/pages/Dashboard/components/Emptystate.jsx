export default function EmptyState() {
  return (
    <div className="text-center py-20">
      <div className="w-14 h-14 bg-slate-700/60 border border-slate-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <svg className="w-7 h-7 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <p className="text-slate-400 text-sm font-medium">No projects yet</p>
      <p className="text-slate-500 text-xs mt-1">Projects will appear here once created.</p>
    </div>
  );
}