const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/auth.middleware");

const {
    getTransactions,
    addTransaction,
    deleteTransaction
} = require("../controllers/transactionController");

router.get("/", authMiddleware, getTransactions);
router.post("/", authMiddleware, addTransaction);
router.delete("/:id", authMiddleware, deleteTransaction);

module.exports = router;