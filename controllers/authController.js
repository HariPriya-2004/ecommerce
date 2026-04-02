const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.user_login = async (req, res) => {
    console.log("req.body", req.body);

    try {
        // 🔍 Find user by email OR mobile
        const user = await User.findOne({
            $or: [
                { email: req.body.email },
                { mobile: req.body.mobile }
            ],
            status: "0"
        });

        console.log("user", user);

        // ❌ If not found
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        // 🔐 Check password (plain text as per your sir)
        const isMatch = user.password == req.body.password;

        if (!isMatch) {
            return res.status(400).json({
                status: false,
                message: "Invalid credentials"
            });
        }

        // 🔒 Check login status
        if (
            user.loginStatus == "0" ||
            user.role === "admin" ||
            user.role.toLowerCase() === "superadmin"
        ) {
            // 🔑 Create token
            const payload = {
                mobile: user.mobile,
                email: user.email
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET);

            // 🔄 Update user
            user.loginStatus = "1";
            user.token = token;
            user.updatedOn = Date.now().toString();

            await user.save();

            // ✅ Success
            return res.status(200).json({
                status: true,
                data: user
            });
        } else {
            return res.status(400).json({
                status: false,
                message: "Already logged in another device"
            });
        }

    } catch (err) {
        return res.status(500).json({
            status: false,
            error: err.message
        });
    }
};