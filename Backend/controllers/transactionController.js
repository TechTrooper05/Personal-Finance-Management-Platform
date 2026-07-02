// const { request } = require("../src/app");
const Transaction = require("../src/models/transaction.model");

const getTransactions = async(req,res) => {
    try {
        const transactions = await Transaction.find({userId: req.userId});
        res.status(200).json({
            message: "Transactions fetched successfully!",
            transactions,
        });
    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const addTransaction = async(req, res) => {
    try {
        const transaction = await Transaction.create({
            ...req.body,
            userId: req.userId
        });
        res.status(201).json({
            message: "Transactions added successfully!",
            transaction
    });
    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// There is no update function yet

const deleteTransaction = async(req,res) => {
    try {
        const transaction = await Transaction.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId
        });
        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found!"
            })
        }
        res.status(200).json({
            message: "Transaction deleted successfully!"
        });
    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getTransactions,
    addTransaction,
    deleteTransaction
};