import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../api";

import Navbar from "../../components/Navbar";
import StatCard from "./components/StatCard";
import EmployeeGreeting from "./components/EmployeeGreeting";
import CreateProjectForm from "./components/CreateProjectForm";
import ProjectsTable from "./components/ProjectsTable";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [projectsPagination, setProjectsPagination] = useState(null);
  const [projectsPage, setProjectsPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [employees, setEmployees] = useState([]);
  const [employeesPagination, setEmployeesPagination] = useState(null);
  const [employeesPage, setEmployeesPage] = useState(1);
  const [employeesLoading, setEmployeesLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
  });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchProjects = async (page) => {
    setLoading(true);
    try {
      const res = await api.get("/projects", { params: { page, limit: 10 } });
      setProjects(res.data.projects);
      setProjectsPagination(res.data.pagination);
    } catch {
      /* silent */
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async (page = 1) => {
    setEmployeesLoading(true);
    try {
      const res = await api.get("/projects/employees/list", {
        params: { page, limit: 10 },
      });
      setEmployees((prev) =>
        page === 1 ? res.data.employees : [...prev, ...res.data.employees],
      );
      setEmployeesPagination(res.data.pagination);
    } catch {
      /* silent */
    } finally {
      setEmployeesLoading(false);
    }
  };

  useEffect(() => {
    console.log("rendred");

    fetchProjects(projectsPage);
    if (user?.role === "manager") fetchEmployees();
  }, [user]);

  const handleProjectsPageChange = (page) => {
    console.log("Changing to projects page:", page);
    setProjectsPage(page);
    fetchProjects(page);
  };

  const handleLoadMoreEmployees = () => {
    const nextPage = employeesPage + 1;
    setEmployeesPage(nextPage);
    fetchEmployees(nextPage);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleFormChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreate = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    setSubmitting(true);
    try {
      await api.post("/projects", form);
      setFormSuccess("Project created successfully!");
      setForm({ title: "", description: "", assignedTo: "" });
      setProjectsPage(1);
      fetchProjects(1);
      setTimeout(() => {
        setFormSuccess("");
        setShowForm(false);
      }, 1800);
    } catch (err) {
      setFormError(err.response?.data?.message || "Failed to create project");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (projectId, current) => {
    const next = current === "pending" ? "completed" : "pending";
    try {
      await api.patch(`/projects/${projectId}`, { status: next });
      fetchProjects(projectsPage);
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  const totalProjects = projectsPagination?.total ?? projects.length;
  const completedOnPage = projects.filter(
    (p) => p.status === "completed",
  ).length;
  const pendingOnPage = projects.length - completedOnPage;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-500 rounded-full opacity-10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-400 rounded-full opacity-5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600 rounded-full opacity-[0.03] blur-3xl" />
      </div>

      <Navbar user={user} onLogout={handleLogout} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-5">
        {user?.role === "manager" && (
          <div className="grid grid-cols-3 gap-4">
            <StatCard
              label="Total Projects"
              value={totalProjects}
              accent="#6366f1"
            />
            <StatCard label="Pending" value={pendingOnPage} accent="#fbbf24" />
            <StatCard
              label="Completed"
              value={completedOnPage}
              accent="#34d399"
            />
          </div>
        )}

        {user?.role === "employee" && (
          <EmployeeGreeting
            user={user}
            pending={pendingOnPage}
            total={totalProjects}
            completed={completedOnPage}
          />
        )}

        {user?.role === "manager" && (
          <CreateProjectForm
            showForm={showForm}
            setShowForm={(val) => {
              setShowForm(val);
              if (!val) {
                setFormError("");
                setFormSuccess("");
              }
            }}
            form={form}
            employees={employees}
            employeesPagination={employeesPagination}
            employeesLoading={employeesLoading}
            onLoadMoreEmployees={handleLoadMoreEmployees}
            formError={formError}
            formSuccess={formSuccess}
            submitting={submitting}
            onFormChange={handleFormChange}
            onSubmit={handleCreate}
          />
        )}

        <ProjectsTable
          user={user}
          projects={projects}
          loading={loading}
          pagination={projectsPagination}
          onPageChange={handleProjectsPageChange}
          onToggleStatus={handleToggleStatus}
        />
      </div>
    </div>
  );
}
