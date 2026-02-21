const { z } = require("zod");

exports.createBookCopySchema = z.object({
    book_id: z.number({
        required_error: "Book ID is required",
    }).int("Book ID must be an integer").positive("Book ID must be positive"),
    conditionStatus: z.enum(["AVAILABLE", "DAMAGED", "LOST"]).default("AVAILABLE"),
    shelfLocation: z.string().optional(),
});

exports.updateBookCopySchema = exports.createBookCopySchema.partial();