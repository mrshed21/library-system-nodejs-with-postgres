const authService = require("../services/auth.service");
const userService = require("../services/user.service");

// create user
exports.createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await authService.createUser({ name, email, password });

    // send refresh by httponly
    res.cookie("refreshToken", user.refreshTokenValue, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      expires: user.expiresAt,
    });

    res.json({
      success: true,
      message: "User created successfully",
      data: user.data,
      token: user.token,
    });
  } catch (error) {
    next(error);
  }
};
// login user
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await authService.loginUser({ email, password });

    // send refresh by httponly
    res.cookie("refreshToken", user.refreshTokenValue, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      expires: user.expiresAt,
    });

    res.json({
      success: true,
      message: "User created successfully",
      data: user.data,
      token: user.token,
    });
  } catch (error) {
    next(error);
  }
};

// refresh token
exports.refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      const error = new Error("refresh token not found");
      error.status = 401;
      throw error;
    }
    const { accessToken, newRefreshTokenValue, newExpiresAt } =
      await authService.refreshAccessToken(refreshToken);

    res.cookie("refreshToken", newRefreshTokenValue, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      expires: newExpiresAt,
    });

    res.json({
      success: true,
      message: "Access token refreshed successfully",
      token: accessToken,
    });
  } catch (error) {
    next(error);
  }
};

// logout user
exports.logoutUser = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "No refresh token to logout",
      });
    }

    await authService.logout(refreshToken);

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    next(err);
  }
};

// get me from userService
exports.getMe = async (req, res, next) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    const user = await userService.getUserById(userId);

    res.json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, email } = req.body;

    if (!name && !email) {
      const error = new Error("No data provided to update");
      error.status = 400;
      throw error;
    }

    const updatedUser = await authService.updateUser(userId, { name, email });

    res.json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
