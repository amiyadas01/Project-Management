require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./modules/auth/auth.routes");
const projectRoutes = require("./modules/project/project.routes");
const logger = require("./utils/logger");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.url} - ${err.message}`);
  res.status(500).json({ message: "Internal Server Error" });
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

app.get("/api", (req, res) => {
  res.json({ message: "Project Management API is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
