const { z } = require("zod");

exports.createLoanSchema = z.object({
  user_id: z
    .number({
      required_error: "User ID is required",
    })
    .int("User ID must be an integer")
    .positive("User ID must be positive"),

  book_copy_id: z
    .number({
      required_error: "Book copy ID is required",
    })
    .int("Book copy ID must be an integer")
    .positive("Book copy ID must be positive"),

  borrowDate: z.date().optional(),

  dueDate: z.date({
    required_error: "Due date is required",
  }).optional(),

  status: z.enum(["borrowed", "returned", "overdue"]).optional(),

  fine: z.number().optional(),
});


exports.updateLoanSchema = z.object({
  status: z.enum(["borrowed", "returned", "overdue"]).optional(),
  returnDate: z.date().optional(),
  fine: z.number().optional(),
  dueDate: z.date().optional(),
}).partial();
