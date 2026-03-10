import { nanoid } from "nanoid";
import { urldb } from "../models/urls.js";

export const createShortUrl = async (url: string) => {
  try {
    const code = nanoid(6);

    await urldb.create({
      code,
      originalUrl: url,
    });

    return code;
  } catch (error) {
    console.log("Error");
  }
};
