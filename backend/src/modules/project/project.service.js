const Project = require("./project.model");
const User = require("../auth/auth.model");

const createProject = async ({ title, description, assignedTo, createdBy }) => {
  const employee = await User.findById(assignedTo);
  if (!employee || employee.role !== "employee") {
    throw new Error("Assigned user must be a valid employee");
  }

  const project = await Project.create({
    title,
    description,
    assignedTo,
    createdBy,
  });

  return project;
};

const getProjects = async (user, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  let query = user.role === "manager" ? {} : { assignedTo: user.id };

  const projects = await Project.find(query)
    .populate("assignedTo", "name email")
    .populate("createdBy", "name")
    .skip(skip)
    .limit(limit);

  const total = await Project.countDocuments(query);

  return {
    projects,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
};

const updateProjectStatus = async (projectId, userId, status) => {
  const project = await Project.findById(projectId);

  if (!project) {
    throw new Error("Project not found");
  }

  if (project.assignedTo.toString() !== userId) {
    throw new Error("You are not assigned to this project");
  }

  project.status = status;
  await project.save();

  return project;
};

const getAllEmployees = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const employees = await User.find({ role: "employee" }, "name email")
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments({ role: "employee" });

  return {
    employees,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
};

module.exports = {
  createProject,
  getProjects,
  updateProjectStatus,
  getAllEmployees,
};
