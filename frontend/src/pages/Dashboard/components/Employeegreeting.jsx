export default function EmployeeGreeting({ user, pending, total, completed }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-700 bg-slate-800/60 backdrop-blur-sm px-6 py-5 flex items-center justify-between">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-500 rounded-full opacity-5 blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <h2 className="font-display font-bold text-white text-xl">
          Hey, {user?.name} 👋
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          You have{" "}
          <span className="font-semibold text-amber-400">{pending}</span>{" "}
          pending {pending === 1 ? "project" : "projects"}.
        </p>
      </div>

      <div className="hidden sm:flex items-center gap-6 relative z-10">
        <div className="text-center">
          <p className="text-3xl font-bold text-white tabular-nums">{total}</p>
          <p className="text-xs text-slate-500 mt-0.5 uppercase tracking-wider">Assigned</p>
        </div>
        <div className="w-px h-10 bg-slate-700" />
        <div className="text-center">
          <p className="text-3xl font-bold text-emerald-400 tabular-nums">{completed}</p>
          <p className="text-xs text-slate-500 mt-0.5 uppercase tracking-wider">Done</p>
        </div>
      </div>
    </div>
  );
}