const { ZodError } = require("zod");

const validate = (schema, property = "body") => (req, res, next) => {
  try {
    schema.parse(req[property]);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      // DEBUG: log incoming body and zod errors
      console.log("[VALIDATE DEBUG] Body received:", JSON.stringify(req[property], null, 2));
      console.log("[VALIDATE DEBUG] Zod errors:", JSON.stringify(err.errors, null, 2));
      return res.status(400).json({
        success: false,
        errors: err.errors,
        message: err.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(", "),
      });
    }
    next(err);
  }
};

module.exports = validate;
