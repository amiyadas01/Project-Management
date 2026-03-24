export default function Navbar({ user, onLogout }) {
  return (
    <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/40">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <span className="font-display font-bold text-white text-lg tracking-tight">
            ProjectHub
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5">
            <div className="w-6 h-6 rounded-lg bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-xs font-bold text-brand-400">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <span className="text-sm font-medium text-slate-200">{user?.name}</span>
            <span className="text-xs text-slate-400 capitalize bg-slate-700 px-2 py-0.5 rounded-full">
              {user?.role}
            </span>
          </div>
          <button
            onClick={onLogout}
            className="text-sm text-slate-400 hover:text-red-400 border border-slate-700 hover:border-red-500/40 px-3 py-1.5 rounded-xl transition font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}