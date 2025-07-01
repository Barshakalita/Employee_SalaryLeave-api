import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcryptjs'; 

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, error: "User Not Found" });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: "Wrong Password" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_KEY,
            { expiresIn: "10d" }
        );

        res.status(200).json({
            success: true,
            token,
            user: { _id: user._id, name: user.name, role: user.role },
        });
    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ success: false, error: "Server Error" });
    }
};

const verify = (req, res) =>{
    return res.status(200).json({success: true, user: req.user})
}
export { login, verify };
