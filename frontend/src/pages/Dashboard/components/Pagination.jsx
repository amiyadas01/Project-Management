export default function Pagination({ pagination, onPageChange }) {
  console.log("Rendering Pagination with pagination:", pagination);
  if (!pagination || pagination.pages <= 1) return null;

  const { page, pages, total, limit } = pagination;
  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <div className="flex items-center justify-between px-6 py-3 border-t border-slate-700/60">
      <p className="text-xs text-slate-500">
        Showing{" "}
        <span className="text-slate-300 font-medium">
          {from}–{to}
        </span>{" "}
        of <span className="text-slate-300 font-medium">{total}</span>
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {Array.from({ length: pages }, (_, i) => i + 1)
          .filter((p) => p === 1 || p === pages || Math.abs(p - page) <= 1)
          .reduce((acc, p, idx, arr) => {
            if (idx > 0 && p - arr[idx - 1] > 1) {
              acc.push("...");
            }
            acc.push(p);
            return acc;
          }, [])
          .map((item, idx) =>
            item === "..." ? (
              <span
                key={`ellipsis-${idx}`}
                className="w-8 h-8 flex items-center justify-center text-slate-600 text-xs"
              >
                ···
              </span>
            ) : (
              <button
                key={item}
                onClick={() => onPageChange(item)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-semibold transition ${
                  item === page
                    ? "bg-brand-500 text-white shadow-md shadow-brand-500/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-700"
                }`}
              >
                {item}
              </button>
            ),
          )}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === pages}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
