import express from "express";
const router = express.Router();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import User from "../models/userModel.js";
import { auth } from "../controllers/userController.js";

router.post("/register", async (req, res) => {
    const { username, email, password, passwordCheck } = req.body;

    try {
        // Check Errors
        if (!username || !email || !password || !passwordCheck)
            return res.status(400).json({ msg: "Please fill in all fields" });
        const usernameExists = await User.findOne({ username });
        if (usernameExists)
            return res.status(400).json({ msg: "Username already exists" });
        const emailExists = await User.findOne({ email });
        if (emailExists)
            return res.status(400).json({ msg: "Email already exists" });
        if (password.length < 8)
            return res
                .status(400)
                .json({ msg: "Password must be more than 8 characters" });
        if (password !== passwordCheck)
            return res.status(400).json({ msg: "Passwords don't match" });

        // Create User
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hash,
        });
        const savedUser = await newUser.save();

        // JWT
        const token = await jwt.sign(
            { id: savedUser._id },
            process.env.JWT_SECRET
        );

        // Return State
        res.json({
            token,
            user: {
                id: savedUser._id,
                username: savedUser.username,
            },
        });
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.post("/login", async (req, res) => {
    const { identity, password } = req.body;

    try {
        // Error Checking
        if (!identity || !password)
            return res.status(400).json({ msg: "Please fill in all fields" });
        const user = await User.findOne({
            $or: [{ email: identity }, { username: identity }],
        });
        if (!user)
            return res
                .status(400)
                .json({ msg: "Email/Username does not exist" });
        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch)
            return res.status(400).json({ msg: "Incorrect Password" });

        // Create Context
        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
            },
        });
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);

    if (!user) {
        return res.json(false);
    } else {
        res.json({
            id: user._id,
            username: user.username,
        });
    }
});

export default router;
