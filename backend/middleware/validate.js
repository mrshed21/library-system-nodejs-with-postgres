const { ZodError } = require("zod");

const validate = (schema, property = "body") => (req, res, next) => {
  try {
    schema.parse(req[property]);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        success: false,
        errors: err.errors,
        message: "Validation error",
      });
    }
    next(err);
  }
};

module.exports = validate;
