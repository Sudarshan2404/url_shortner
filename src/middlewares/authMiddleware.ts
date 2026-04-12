import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const JWT_SECRET: string | undefined = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.log("Jwt secret not defined");
      return;
    }
    const token = req.cookies.token;

    if (!token) {
      return res.status(402).json({ status: false, message: "Please Log In" });
    }
    const verify = jwt.verify(token, JWT_SECRET);

    if (!verify) {
      return res
        .status(401)
        .json({ status: false, message: "Session Expired Login Again" });
    }
    next();
  } catch (error) {
    console.log("Error occured in auth middleware", error);
    res.status(500).json({ status: false, message: "Internal server Error" });
  }
};
