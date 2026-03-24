const express = require("express");
const { create, getAll, updateStatus, getEmployees } = require("./project.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", roleMiddleware("manager"), create);

router.get("/", getAll);

router.patch("/:id", roleMiddleware("employee"), updateStatus);

router.get("/employees/list", roleMiddleware("manager"), getEmployees);

module.exports = router;
