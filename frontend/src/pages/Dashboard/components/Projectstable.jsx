import StatusBadge from "./StatusBadge";
import EmptyState from "./EmptyState";
import Pagination from "./Pagination";

export default function ProjectsTable({
  user,
  projects,
  loading,
  pagination,
  onPageChange,
  onToggleStatus,
}) {
  const total = pagination?.total ?? projects.length;

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/60 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-700/60 flex items-center justify-between">
        <h2 className="font-display font-bold text-white">
          {user?.role === "manager" ? "All Projects" : "My Projects"}
        </h2>
        <span className="text-xs font-medium text-slate-400 bg-slate-700 border border-slate-600 px-2.5 py-1 rounded-full tabular-nums">
          {total} total
        </span>
      </div>

      {/* Body */}
      {loading ? (
        <div className="flex items-center justify-center py-20 gap-2 text-slate-500">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span className="text-sm">Loading projects...</span>
        </div>
      ) : projects.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900/40 text-left">
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Project
                  </th>
                  {user?.role === "manager" && (
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Assigned To
                    </th>
                  )}
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  {user?.role === "employee" && (
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/40">
                {projects.map((project) => (
                  <tr key={project._id} className="hover:bg-slate-700/20 transition">
                    {/* Title + description */}
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-100">{project.title}</p>
                      {project.description && (
                        <p className="text-slate-500 text-xs mt-0.5 truncate max-w-xs">
                          {project.description}
                        </p>
                      )}
                    </td>

                    {user?.role === "manager" && (
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-brand-500/20 border border-brand-500/20 flex items-center justify-center text-xs font-bold text-brand-400">
                            {project.assignedTo?.name?.[0]?.toUpperCase()}
                          </div>
                          <span className="text-slate-300">
                            {project.assignedTo?.name || "—"}
                          </span>
                        </div>
                      </td>
                    )}

                    <td className="px-6 py-4">
                      <StatusBadge status={project.status} />
                    </td>

                    {user?.role === "employee" && (
                      <td className="px-6 py-4">
                        <button
                          onClick={() => onToggleStatus(project._id, project.status)}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition ${
                            project.status === "pending"
                              ? "bg-brand-500 hover:bg-brand-600 text-white shadow-md shadow-brand-500/30"
                              : "bg-slate-700 hover:bg-slate-600 text-slate-300"
                          }`}
                        >
                          {project.status === "pending" ? "✓ Mark Complete" : "↩ Mark Pending"}
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination pagination={pagination} onPageChange={onPageChange} />
        </>
      )}
    </div>
  );
}