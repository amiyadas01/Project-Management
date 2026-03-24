const User = require("./auth.model");
const { hashPassword, comparePassword } = require("../../utils/hash");
const { generateToken } = require("../../utils/jwt");

const registerUser = async ({ name, email, password, role }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  const hashed = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashed,
    role: role || "employee",
  });

  const token = generateToken({ id: user._id, role: user.role });

  return { token, user: { id: user._id, name: user.name, role: user.role } };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({ id: user._id, role: user.role });

  return { token, user: { id: user._id, name: user.name, role: user.role } };
};

module.exports = { registerUser, loginUser };
