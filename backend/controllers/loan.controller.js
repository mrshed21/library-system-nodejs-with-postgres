const loanService = require("../services/loan.service");

exports.createLoan = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const book_copy_id =  req.body.book_id;
    const loan = await loanService.createLoan(user_id, book_copy_id);
    res.json({ success: true, message: "Loan created", data: loan });
  } catch (error) {
    next(error);
  }
};

exports.returnLoan = async (req , res ,next) => {
    try {
        const user_id = req.user.id;
        const loan_id = req.params.id;
        const loan = await loanService.returnLoan(user_id , loan_id);
        res.json({ success: true, message: "Loan returned", data: loan });
    } catch (error) {
        next(error);
    }
}

exports.showUserLoans = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const loans = await loanService.showUserLoans(user_id);
    res.json({ 
      success: true,
      message: 'Loans fetched successfully',
      data: loans 
    });
  } catch (error) {
    next(error);
  }
};

exports.showUserLoanById = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const loan = await loanService.showUserLoanById(user_id, req.params.id);
    res.json({ 
      success: true,
      message: 'Loan fetched successfully',
      data: loan 
    });
  } catch (error) {
    next(error);
  }
};

// admin controller
exports.showAllLoans = async (req, res, next) => {
  try {
    const loans = await loanService.showAllLoans();
    res.json({ 
      success: true,
      message: 'Loans fetched successfully',
      data: loans 
    });
  } catch (error) {
    next(error);
  }
};
exports.showLoanById = async (req, res, next) => {
  try {
    const loan = await loanService.showLoanById(req.params.id);
    res.json({ 
      success: true,
      message: 'Loan fetched successfully',
      data: loan 
    });
  } catch (error) {
    next(error);
  }
};

// admin create loan for any user
exports.adminCreateLoan = async (req, res, next) => {
  try {
    const { user_id, book_id } = req.body;
    if (!user_id || !book_id) {
      const error = new Error('user_id and book_id are required');
      error.status = 400;
      throw error;
    }
    const loan = await loanService.createLoan(user_id, book_id);
    res.json({ success: true, message: 'Loan created by admin', data: loan });
  } catch (error) {
    next(error);
  }
};

// admin return any loan (no user_id restriction)
exports.adminReturnLoan = async (req, res, next) => {
  try {
    const loan_id = req.params.id;
    const loan = await loanService.adminReturnLoan(loan_id);
    res.json({ success: true, message: 'Loan returned by admin', data: loan });
  } catch (error) {
    next(error);
  }
};
