const { z } = require("zod");

exports.createBookSchema = z.object({
  title: z.string({
    required_error: "Book title is required",
  }).min(1, "Book title cannot be empty"),
  description: z.string().optional(),
  price: z.number({
    required_error: "Price is required",
  }).positive("Price must be positive"),
  isbn: z.string({
    required_error: "ISBN is required",
  }).min(1, "ISBN cannot be empty"),
  publication_year: z.number({
    required_error: "Publication year is required",
  }).int("Publication year must be an integer").positive("Publication year must be positive"),
  language: z.string({
    required_error: "Language is required",
  }).min(1, "Language cannot be empty"),
  publisher: z.string({
    required_error: "Publisher is required",
  }).min(1, "Publisher cannot be empty"),
  pages: z.number({
    required_error: "Pages is required",
  }).int("Pages must be an integer").positive("Pages must be positive"),
  cover_image_url: z.string().optional(),
  edition: z.string().optional(),
  genre_ids: z.array(z.number({
    required_error: "Genre IDs are required",
  })).min(1, "At least one genre is required"),
  author_id: z.number({
    required_error: "Author ID is required",
  }).int("Author ID must be an integer").positive("Author ID must be positive"),
});

exports.updateBookSchema = exports.createBookSchema.partial();

