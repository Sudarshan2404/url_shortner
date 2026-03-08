import { nanoid } from "nanoid";
import mongoose from "mongoose";

const urls: Record<string, string> = {};

export const createShortUrl = async (url: string) => {
  const code = nanoid(6);
};
