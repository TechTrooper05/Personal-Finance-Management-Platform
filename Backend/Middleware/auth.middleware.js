const jwt = require("jsonwebtoken");
const User = require("../src/models/user.model");

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access"
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(401).json({
                message: "User not found!"
            })
        }
        req.user = user;
        next();
    } catch(error) {
        return res.status(401).json({
            message: "Unauthorized access"
        });
    }
};
module.exports = authMiddleware;