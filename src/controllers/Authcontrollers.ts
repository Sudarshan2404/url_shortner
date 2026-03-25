import type { Request, Response } from "express";
import { usersdb } from "../models/users.js";
import { genreatetoken } from "../Services/genreatetoken.services.js";
import { success, z } from "zod";
import bcrypt from "bcrypt";

// import bcrypt and hash password, create login route

const registerSchema = z.object({
  username: z.string().min(4).toLowerCase(),
  email: z.email().toLowerCase(),
  password: z.string().min(6),
  name: z.string().min(2),
});

const saltRounds: number = 10;
if (!saltRounds) {
  console.log("NO salt Rounds");
}

const loginSchema = z.object({
  username: z.string().min(4).toLowerCase(),
  password: z.string().min(6),
});

type register = {
  username: string;
  email: string;
  password: string;
  name: string;
};

export const register = async (req: Request, res: Response) => {
  try {
    const parse = registerSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json("Invalid Inputs");
    }

    const { username, email, password, name } = parse.data;
    const userexist = await usersdb.findOne({ email });
    if (userexist) {
      return res.status(409).json({
        status: false,
        message: "User Already exist try a different email",
      });
    }
    const usernameAvl = await usersdb.findOne({ username });
    if (usernameAvl) {
      return res.status(409).json({
        status: false,
        message: "User Already exist try a different email",
      });
    }

    const hashedPass = await bcrypt.hash(password, saltRounds);
    const user = await usersdb.create({
      username,
      email,
      password: hashedPass,
      Name: name,
    });

    const token = genreatetoken(user._id);
    console.log("Everything fine till here");
    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.DEVLOPMENT === "Production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ success: true, message: "User Created Successfully" });
  } catch (error) {
    console.log("Error Occured while registering user: ", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Error Occured" });
  }
};

export const login = async (req: Request, res: Response) => {
  type user = {
    _id: object;
    username: string;
    password: string;
  };
  try {
    const parse = loginSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ status: false, message: "Invalid Inputs" });
    }

    const { username, password } = parse.data;

    const userExist: user | null = await usersdb.findOne({ username });

    if (!userExist) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid Username" });
    }

    const passCompare = await bcrypt.compare(password, userExist.password);
    if (!passCompare) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid Password" });
    }

    const token = genreatetoken(userExist._id);
    if (!token) {
      return new Error("Cannot create a token");
    }
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ status: true, message: "Logged in Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};
