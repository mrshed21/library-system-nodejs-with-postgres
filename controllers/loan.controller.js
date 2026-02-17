const loanService = require("../services/loan.service");

exports.createLoan = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const loan = await loanService.createLoan(user_id, req.body.book_id);
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
    res.json({ success: true, data: loans });
  } catch (error) {
    next(error);
  }
};

exports.showUserLoanById = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const loan = await loanService.showUserLoanById(user_id, req.params.id);
    res.json({ success: true, data: loan });
  } catch (error) {
    next(error);
  }
};

// admin controller
exports.showAllLoans = async (req, res, next) => {
  try {
    const loans = await loanService.showAllLoans();
    res.json({ success: true, data: loans });
  } catch (error) {
    next(error);
  }
};
exports.showLoanById = async (req, res, next) => {
  try {
    const loan = await loanService.showLoanById(req.params.id);
    res.json({ success: true, data: loan });
  } catch (error) {
    next(error);
  }
};
