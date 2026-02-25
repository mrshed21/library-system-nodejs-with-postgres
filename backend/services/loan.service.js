const { Loan, BookCopy, Users, Books } = require("../models/Index");
const {sequelize} = require("../config/sequelize.config");

const LOAN_DURATION = 30; // 30 days
const DAILY_FINE = 1;
const MAX_ACTIVE_LOANS = 3;



const createLoan = async (user_id, book_id) => {
  const t = await sequelize.transaction();
  try {
    const bookCopy = await BookCopy.findOne({
      where: {
         book_id,
         conditionStatus: "AVAILABLE",
      },
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    // book copy not found
    if (!bookCopy) {
      const error = new Error("No available copy of this book");

      error.status = 404;
      throw error;
    }

    // book copy is not available
    if (bookCopy.conditionStatus !== "AVAILABLE") {
      const error = new Error("Book copy is not available");
      error.status = 400;
      throw error;
    }

    // check if user has reached the maximum number of active loans
    const activeLoanCount = await Loan.count({
      where: {
        user_id,
        status: "borrowed",
      },
      transaction: t,
    });

    if (activeLoanCount >= MAX_ACTIVE_LOANS) {
      const error = new Error(
        "User has reached the maximum number of active loans",
      );
      error.status = 400;
      throw error;
    }

    // check if user has already borrowed this book
    const existingLoan = await Loan.findOne({
      where: {
        user_id,
        status: "borrowed",
      },
      include: {
        model: BookCopy,
        where: {
          book_id: bookCopy.book_id,
        },
      },
      transaction: t,
    });

    if (existingLoan) {
      const error = new Error("User has already borrowed this book");
      error.status = 400;
      throw error;
    }

    const borrowDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(borrowDate.getDate() + LOAN_DURATION);

    const loan = await Loan.create(
      {
        user_id,
        book_copy_id: bookCopy.id,
        borrowDate,
        dueDate,
        status: "borrowed",
        fine: 0,
      },
      { transaction: t },
    );

    await bookCopy.update(
      {
        conditionStatus: "BORROWED",
      },
      { transaction: t },
    );

    await t.commit();

    return loan;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const returnLoan = async (user_id,loan_id) => {
  const t = await sequelize.transaction();
  try {
    const loan = await Loan.findOne(
        {
            where: {
                user_id,
                id: loan_id,
            }
        }
        , {transaction: t });
   
    if (!loan) {
      const error = new Error("Loan not found");
      error.status = 404;
      throw error;
    }

    if (loan.status === "returned") {
      const error = new Error("Loan already returned");
      error.status = 400;
      throw error;
    }

    const now = new Date();
    loan.returnDate = now;

    const overdueDays = Math.max(
      0,
      Math.ceil((now - loan.dueDate) / (1000 * 60 * 60 * 24)),
    );

    const fine = overdueDays * DAILY_FINE;
    loan.status = overdueDays > 0 ? "overdue" : "returned";

    await loan.save();

    const bookCopy = await BookCopy.findByPk(loan.book_copy_id , {transaction: t });

    await bookCopy.update(
      {
        conditionStatus: "AVAILABLE",
      },
      { transaction: t },
    );

    await t.commit();

    return loan;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const showUserLoans = async (id)=> {
    const loans = await Loan.findAll({
        where: {
            user_id: id,
        }
    })
    return loans;
}

const showUserLoanById = async (id,loan_id) => {
    const loan = await Loan.findOne({
        where: {
            user_id: id,
            id: loan_id,
        }
    });
    if (!loan) {
        const error = new Error("Loan not found");
        error.status = 404;
        throw error;
    }
    return loan;
}


// admin routes
const showAllLoans = async () => {
    const loans = await Loan.findAll();
    return loans;
}

const showLoanById = async (id)=> {
    const loan = await Loan.findByPk(id );
    if (!loan) {
        const error = new Error("Loan not found");
        error.status = 404;
        throw error;
    }
    return loan;
}



module.exports = {
  createLoan,
  returnLoan,
  showAllLoans,
  showUserLoans,
  showLoanById,
  showUserLoanById
};
