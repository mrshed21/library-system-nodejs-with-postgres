const { z } = require("zod");

exports.createGenreSchema = z.object({
  name: z.string({
    required_error: "Genre name is required",
  }).min(1, "Genre name cannot be empty"),
});

exports.updateGenreSchema = exports.createGenreSchema.partial();
