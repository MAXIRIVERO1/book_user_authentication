const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../db/db.js");
const dotenv = require("dotenv");

dotenv.config()

const jwtSecret = process.env.JWT_SECRET;

const login = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({where: {email}});
        if(!user){
            res.status(404).json({ success: false, message: "User not found" });
        };
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        };
        const token = jwt.sign({ userId: user.id, email: user.email }, jwtSecret, { expiresIn: "1h" });
        return res.status(200).json({ success: true, token: token });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    login
}