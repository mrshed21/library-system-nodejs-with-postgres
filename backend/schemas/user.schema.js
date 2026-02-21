const { z } = require("zod");

exports.createUserSchema = z.object({
  name: z.string().min(1, "User name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["user", "admin"]).default("user"),
});


exports.updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional()
});




exports.loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});






exports.changePasswordSchema = z.object({
  oldPassword: z.string().min(6),
  newPassword: z.string().min(6)
});