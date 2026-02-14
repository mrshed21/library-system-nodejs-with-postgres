const { z } = require("zod");

exports.createAuthorSchema = z.object({
  name: z.string({
    required_error: "Author name is required",
  }).min(1, "Author name cannot be empty"),

  year_of_birth: z.number({
    required_error: "Year of birth is required",
  }).int("Year of birth must be an integer").positive("Year of birth must be positive"),
});

exports.updateAuthorSchema = exports.createAuthorSchema.partial();


