// Imports
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const app = express();

// Middleware
app.use(express.json());

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

// MongoDB setup
mongoose.connect(
    process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },
    (err) => console.log(err || "MongoDB Connected")
);

// Routes
import userRouter from "./routes/userRouter.js";
app.use("/users", userRouter);

app.get("/", (req, res) => {
    res.send("Home");
});
