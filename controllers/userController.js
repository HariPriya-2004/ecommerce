import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// 🔥 random password generator
function generatePassword(length = 6) {
    return Math.random().toString(36).slice(-length);
}

export const create_user = async (req, res) => {
    console.log("req.body", req.body);

    try {
        const body = req.body;

        // ✅ validation
        if (!body.mobile || !body.email || !body.role) {
            return res.status(400).json({
                status: false,
                message: "Please fill required fields"
            });
        }

        // 🔁 check duplicate
        const existingUser = await User.findOne({ mobile: body.mobile });

        if (existingUser && existingUser.status !== "2") {
            return res.status(400).json({
                status: false,
                message: "Mobile already exists"
            });
        }

        // 🔐 generate password
        const rawPassword = generatePassword(6);

       

        // 👤 create user
        const newUser = new User({
            ...body,
            password: rawPassword,
            status: "0",
            loginStatus: "0",
            
            createdOn: Date.now().toString(),
            updatedOn: Date.now().toString(),
            joiningDate: Date.now().toString()
        });

        await newUser.save();

        // 📧 TEMP (instead of email)
        console.log("User credentials:");
        console.log("Mobile:", body.mobile);
        console.log("Password:", rawPassword);

        return res.status(201).json({
            status: true,
            message: "User created successfully",
            password: rawPassword // for testing
        });

    } catch (err) {
        return res.status(500).json({
            status: false,
            error: err.message
        });
    }
};