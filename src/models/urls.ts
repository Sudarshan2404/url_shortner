import mongoose from "mongoose";
import { object, string, number } from "zod";

const urlsSchema = new mongoose.Schema({
  id: object,
  shortencode: string,
  originalUrl: string,
  clicks: number,
});

export const urldb = mongoose.model("Urls", urlsSchema);
