const express = require("express")
const app = express()
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cors({
    origin: ["http://localhost:3000", "https://fintrack-kartik.vercel.app"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const transactionRoutes = require("../routes/transactionRoutes");
const userRoutes = require("../routes/userRoutes");

app.use("/api/transactions", transactionRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;