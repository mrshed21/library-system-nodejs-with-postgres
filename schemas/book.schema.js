const { z } = require("zod");

exports.createBookSchema = z.object({
  name: z.string({
    required_error: "Book name is required",
  }).min(1, "Book name cannot be empty"),

  price: z.number({
    required_error: "Price is required",
  }).positive("Price must be positive"),

  stock: z.number({
    required_error: "Stock is required",
  }).int("Stock must be an integer").nonnegative("Stock cannot be negative"),

  author_id: z.number({
    required_error: "Author ID is required",
  }).int("Author ID must be an integer").positive("Author ID must be positive"),
});

exports.updateBookSchema = exports.createBookSchema.partial();
