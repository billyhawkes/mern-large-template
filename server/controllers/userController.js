import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const auth = async (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token)
        return res.status(401).json({ msg: "Authorization Denied. No Token" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err)
            return res
                .status(401)
                .json({ msg: "Authorization Denied. Token Error" });
        req.user = decoded.id;
    });

    next();
};
