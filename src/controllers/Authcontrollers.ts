import type { Request, Response } from "express";
import { usersdb } from "../models/users.js";
import { z } from "zod";

const registerSchema = z.object({
  username: z.string().min(4).toLowerCase(),
  email: z.email().toLowerCase(),
  password: z.string().min(6),
  name: z.string().min(2),
});

const loginSchema = z.object({
  username: z.string().min(4).toLowerCase(),
  password: z.string().min(6),
});

type register = {
  username: String;
  email: String;
  password: String;
  name: String;
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
    const user = await usersdb.create({
      username,
      email,
      password,
      Name: name,
    });

    return res.status(201).json({
      status: true,
      user,
    });
  } catch (error) {
    console.log("Error Occured while registering user: ", error);
    return res.status(500).json("Internal Error Occured");
  }
};
