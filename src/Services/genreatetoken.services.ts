import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt.js";

export const genreatetoken = (userId: object) => {
  if (!userId) {
    return "Cannot genreate a token";
  }
  const token = jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

  return token;
};
