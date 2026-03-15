const { z } = require("zod");

exports.createBookCopySchema = z.object({
    book_id: z.number({
        required_error: "Book ID is required",
    }).int("Book ID must be an integer").positive("Book ID must be positive"),
    status: z.enum(['AVAILABLE', 'BORROWED', 'DAMAGED', 'LOST']).optional().default('AVAILABLE'),
    shelfLocation: z.string().optional(),
    notes: z.string().optional(),
});

exports.updateBookCopySchema = exports.createBookCopySchema.partial();