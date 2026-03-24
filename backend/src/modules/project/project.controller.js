const {
  createProject,
  getProjects,
  updateProjectStatus,
  getAllEmployees,
} = require("./project.service");
const logger = require("../../utils/logger");

const create = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;

    if (!title || !assignedTo) {
      return res
        .status(400)
        .json({ message: "Title and assignedTo are required" });
    }

    const project = await createProject({
      title,
      description,
      assignedTo,
      createdBy: req.user.id,
    });

    res.status(201).json(project);
  } catch (error) {
    logger.error(`Error occurred while creating project: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));

    const result = await getProjects(req.user, page, limit);
    res.status(200).json(result);
  } catch (error) {
    logger.error(`Error occurred while fetching projects: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !["pending", "completed"].includes(status)) {
      return res
        .status(400)
        .json({ message: "Valid status (pending/completed) is required" });
    }

    const project = await updateProjectStatus(
      req.params.id,
      req.user.id,
      status,
    );
    res.status(200).json(project);
  } catch (error) {
    logger.error(
      `Error occurred while updating project status: ${error.message}`,
    );
    res.status(400).json({ message: error.message });
  }
};

const getEmployees = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));

    const result = await getAllEmployees(page, limit);
    res.status(200).json(result);
  } catch (error) {
    logger.error(`Error occurred while fetching employees: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { create, getAll, updateStatus, getEmployees };
