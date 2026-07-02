require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/db/db");

const PORT = process.env.PORT || 5000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is now running on port ${PORT}!`);
        });
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
    });