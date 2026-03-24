const { registerUser, loginUser } = require("./auth.service");
const logger = require("../../utils/logger");
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = await registerUser({ name, email, password, role });
    res.status(201).json(result);
    logger.info(`User registered successfully: ${result.email}`);
  } catch (error) {
    logger.error(`Error occurred while registering user: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const result = await loginUser({ email, password });
    res.status(200).json(result);
  } catch (error) {
    logger.error(`Error occurred while logging in user: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

module.exports = { register, login };
