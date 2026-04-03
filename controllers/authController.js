import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const user_login = async (req, res) => {
    console.log("req.body", req.body);

    try {
        // 🔍 Find user
        const user = await User.findOne({
            $or: [
                { email: req.body.email },
                { mobile: req.body.mobile }
            ],
            status: "0"
        });

        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        // 🔐 Check password
        if (user.password !== req.body.password) {
            return res.status(400).json({
                status: false,
                message: "Invalid credentials"
            });
        }

        // 🔑 Create token
        const payload = {
            mobile: user.mobile,
            email: user.email
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET);

        // 🔄 Update user
        user.token = token;
        user.updatedOn = Date.now().toString();

        await user.save();

        // ✅ Success
        return res.status(200).json({
            status: true,
            data: user
        });

    } catch (err) {
        return res.status(500).json({
            status: false,
            error: err.message
        });
    }
};