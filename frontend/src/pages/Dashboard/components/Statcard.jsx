export default function StatCard({ label, value, accent }) {
  return (
    <div
      className="relative overflow-hidden rounded-xl border border-slate-700 bg-slate-800/60 backdrop-blur-sm p-5"
      style={{ borderLeftColor: accent, borderLeftWidth: "3px" }}
    >
      <div
        className="absolute -top-6 -left-6 w-20 h-20 rounded-full blur-2xl opacity-20"
        style={{ background: accent }}
      />
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest relative z-10">
        {label}
      </p>
      <p className="text-4xl font-bold text-white mt-1 relative z-10 tabular-nums">
        {value}
      </p>
    </div>
  );
}