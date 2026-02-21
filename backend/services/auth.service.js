const { Users, RefreshToken } = require("../models/Index");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// create user
exports.createUser = async (user) => {
  
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = await Users.create({
    ...user,
    password: hashedPassword,
  });

  const { id, name, email, role, isActive } = newUser;

  const token = jwt.sign(
    { id: id, role: role, email: email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  // generate refresh token
  const refreshTokenValue = crypto.randomBytes(64).toString("hex");
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await RefreshToken.create({
    token: refreshTokenValue,
    expiresAt,
    user_id: newUser.id,
  });

  return {
    data: { id, name, email, role, isActive },
    token,
    refreshTokenValue,
    expiresAt,
  };
};

// login user
exports.loginUser = async (user) => {
  const { email, password } = user;

  const existingUser = await Users.findOne({
    where: {
      email: email,
    },
    attributes: [
      "id",
      "name",
      "email",
      "password",
      "role",
      "isActive",
      "createdAt",
      "updatedAt",
    ],
  });

  if (!existingUser) {
    const error = new Error("Invalid username or password");
    error.status = 401;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordValid) {
    const error = new Error("Invalid username or password");
    error.status = 401;
    throw error;
  }

  const userData = {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
    role: existingUser.role,
    isActive: existingUser.isActive,
  };

  // generate access token
  const token = jwt.sign(
    { id: existingUser.id, role: existingUser.role, email: existingUser.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  // generate refresh token
  const refreshTokenValue = crypto.randomBytes(64).toString("hex");
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await RefreshToken.create({
    token: refreshTokenValue,
    expiresAt,
    user_id: existingUser.id,
  });

  return {
    data: userData,
    token,
    refreshTokenValue,
    expiresAt,
  };
};

// refresh token
exports.refreshAccessToken = async (refreshTokenValue) => {
  const dbToken = await RefreshToken.findOne({
    where: { token: refreshTokenValue },
  });
  if (!dbToken) {
    const error = new Error("Refresh token invalid");
    error.status = 401;
    throw error;
  }

  if (dbToken.expiresAt < new Date()) {
    const error = new Error("Refresh token expired");
    error.status = 401;
    throw error;
  }

  const user = await Users.findByPk(dbToken.userId);

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  const accessToken = jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  return accessToken;
};

// logout user
exports.logout = async (refreshToken) => {
  await RefreshToken.destroy({ where: { token: refreshToken } });
};

exports.updateUser = async (userId, user) => {
  const allowedFields = ["name", "email"];
  const filterdData = {};
  allowedFields.forEach((field) => {
    if (user[field]) {
      filterdData[field] = user[field];
    }
  });
  const [updatedCount , updatedUser] = await Users.update(filterdData, {
    where: { id: userId }, returning: true,
  });
  if (updatedCount === 0) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }
  const {id , name , email , role , isActive} = updatedUser[0];
  return {id , name , email , role , isActive}
};
