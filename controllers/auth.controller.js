const authService = require("../services/auth.service");
const userService = require("../services/user.service");

exports.createUser = async (req, res, next) => {
  try {
    const user = await authService.createUser(req.body);

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
exports.loginUser = async (req, res, next) => {
  try {
    const user = await authService.loginUser(req.body);

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

exports.refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      const error = new Error("refresh token not found");
      error.status = 401;
      throw error;
    }
    const newAccessToken = await authService.refreshToken(refreshToken);

    res.json({
      success: true,
      message: "Access token refreshed successfully",
      token: newAccessToken,
    });
  } catch (error) {
    next(error);
  }
};



 exports.logoutUser = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'No refresh token to logout'
      });
    }

    await authService.logout(refreshToken);

    
    res.clearCookie('refreshToken');

    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (err) {
    next(err);
  }
}; 


exports.getMe = async (req ,res , next)=> {
  try {
    const userId = req.user.id

    const user = await userService.getUserById(userId)

    res.json({
      success: true,
      message: "User fetched successfully",
      data: user,
    })
  } catch (error) {
    next (error)
  }
}

exports.updateUser = async (req , res ,next) => {
  try {
    const userId = req.user.id

    const updatedUser = await authService.updateUser(userId , req.body)

    res.json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    })
  } catch (error) {
    next(error)
  }
}
