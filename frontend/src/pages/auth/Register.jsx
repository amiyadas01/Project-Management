import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../api";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/register", form);
      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 ">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-500 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-400 rounded-full opacity-10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl mb-4 shadow-lg shadow-brand-500/40">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <h1 className="font-display text-3xl font-bold text-white">
            Create account
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Join your team's workspace
          </p>
        </div>

        <div className="card p-8 bg-slate-800 border border-slate-700 shadow-2xl rounded-2xl">
          {error && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg mb-6">
              <svg
                className="w-5 h-5 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Full name
              </label>
              <input
                className="input-field w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-500 rounded-lg px-4 py-2.5 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Email address
              </label>
              <input
                className="input-field w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-500 rounded-lg px-4 py-2.5 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Password
              </label>
              <input
                className="input-field w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-500 rounded-lg px-4 py-2.5 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["employee", "manager"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setForm({ ...form, role: r })}
                    className={`py-2.5 px-4 rounded-lg border text-sm font-medium capitalize transition ${
                      form.role === r
                        ? "bg-gradient-to-r from-brand-500 to-brand-600 border-brand-500 text-white shadow-lg shadow-brand-500/30"
                        : "bg-slate-700 border-slate-600 text-slate-300 hover:border-brand-500/50 hover:bg-slate-600"
                    }`}
                  >
                    {r === "employee" ? "👤 Employee" : "🏢 Manager"}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="btn-primary w-full bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-medium py-2.5 rounded-lg transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
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
                  Creating account...
                </span>
              ) : (
                "Create account"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-brand-400 hover:text-brand-300 font-medium transition"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
