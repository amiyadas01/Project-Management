export default function CreateProjectForm({
  showForm,
  setShowForm,
  form,
  employees,
  employeesPagination,
  employeesLoading,
  onLoadMoreEmployees,
  formError,
  formSuccess,
  submitting,
  onFormChange,
  onSubmit,
}) {
  const hasMoreEmployees =
    employeesPagination && employeesPagination.page < employeesPagination.pages;

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/60 backdrop-blur-sm overflow-hidden">
      {/* Toggle header */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-700/30 transition"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-500/10 border border-brand-500/20 rounded-xl flex items-center justify-center">
            <svg
              className="w-4 h-4 text-brand-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <span className="font-semibold text-slate-200 text-sm">
            Create New Project
          </span>
        </div>
        <svg
          className={`w-4 h-4 text-slate-500 transition-transform ${showForm ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {showForm && (
        <div className="border-t border-slate-700/60 px-6 py-6">
          {/* Error */}
          {formError && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg mb-5">
              <svg
                className="w-4 h-4 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {formError}
            </div>
          )}

          {/* Success */}
          {formSuccess && (
            <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm px-4 py-3 rounded-lg mb-5">
              <svg
                className="w-4 h-4 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {formSuccess}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Title *
                </label>
                <input
                  className="w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-500 rounded-lg px-4 py-2.5 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition text-sm"
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={onFormChange}
                  placeholder="e.g. Redesign homepage"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Assign To *
                  {employeesPagination && (
                    <span className="ml-2 text-xs text-slate-500 font-normal">
                      ({employees.length} of {employeesPagination.total} loaded)
                    </span>
                  )}
                </label>
                <select
                  className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition text-sm"
                  name="assignedTo"
                  value={form.assignedTo}
                  onChange={onFormChange}
                  required
                >
                  <option value="">-- Select Employee --</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.name} ({emp.email})
                    </option>
                  ))}
                </select>

                {hasMoreEmployees && (
                  <button
                    type="button"
                    onClick={onLoadMoreEmployees}
                    disabled={employeesLoading}
                    className="mt-1.5 w-full flex items-center justify-center gap-1.5 text-xs text-brand-400 hover:text-brand-300 disabled:opacity-50 transition py-1"
                  >
                    {employeesLoading ? (
                      <>
                        <svg
                          className="animate-spin h-3 w-3"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          />
                        </svg>
                        Loading…
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                        Load more employees
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Description
              </label>
              <textarea
                className="w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-500 rounded-lg px-4 py-2.5 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition text-sm resize-none"
                rows={3}
                name="description"
                value={form.description}
                onChange={onFormChange}
                placeholder="Brief description of the project (optional)"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 border border-slate-600 hover:border-slate-500 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white text-sm font-semibold rounded-lg transition disabled:opacity-60 flex items-center gap-2 shadow-lg shadow-brand-500/30"
              >
                {submitting ? (
                  <>
                    <svg
                      className="animate-spin h-3.5 w-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Creating…
                  </>
                ) : (
                  "Create Project"
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
