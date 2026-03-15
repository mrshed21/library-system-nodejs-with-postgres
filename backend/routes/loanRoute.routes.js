const express = require("express");
const router = express.Router();
const loanController = require("../controllers/loan.controller");
const { authMiddleware, adminonly } = require("../middleware/auth");

// --------------- user routes --------------- //
// create loan
router.post("/user/loan", authMiddleware, loanController.createLoan);

// return loan
router.put("/user/loan/:id", authMiddleware, loanController.returnLoan);

// get all user loans
router.get("/user/loans", authMiddleware, loanController.showUserLoans);

// get user loan by id
router.get("/user/loan/:id", authMiddleware, loanController.showUserLoanById);


// --------------- admin routes --------------- //
// show all loans
router.get("/admin/loans", authMiddleware, adminonly, loanController.showAllLoans);

// create loan for any user (admin)
router.post("/admin/loan", authMiddleware, adminonly, loanController.adminCreateLoan);

// return any loan (admin) — MUST be before /admin/loan/:id to avoid :id matching "return"
router.put("/admin/loan/:id/return", authMiddleware, adminonly, loanController.adminReturnLoan);

// show loan by id (admin)
router.get("/admin/loan/:id", authMiddleware, adminonly, loanController.showLoanById);

module.exports = router;