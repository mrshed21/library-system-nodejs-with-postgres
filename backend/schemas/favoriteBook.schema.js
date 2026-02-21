const { z } = require("zod");

exports.createFavoriteBookSchema = z.object({
  book_id: z.number({
    required_error: "Book ID is required",
  }).int("Book ID must be an integer").positive("Book ID must be positive"),
});

