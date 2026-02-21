const express = require("express");
const router = express.Router();
const loanController = require("../controllers/loan.controller");
const { createLoanSchema } = require("../schemas/loan.schema");
const { authMiddleware, adminonly } = require("../middleware/auth");
const validate = require("../middleware/validate");




// create loan
router.post("/user/loan",authMiddleware,  loanController.createLoan);

// return loan
router.put("/user/loan/:id",authMiddleware, loanController.returnLoan);

// get all user loans
router.get("/user/loans",authMiddleware, loanController.showUserLoans);

// get user loan by id
router.get("/user/loan/:id",authMiddleware, loanController.showUserLoanById);





// --------------- admin routes --------------- //
// show all loans
router.get("/admin/loans",authMiddleware,adminonly, loanController.showAllLoans);

// show loan by id
router.get("/admin/loan/:id",authMiddleware,adminonly, loanController.showLoanById);











module.exports = router;