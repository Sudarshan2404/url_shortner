import { nanoid } from "nanoid";
import { urldb } from "../models/urls.js";

export const createShortUrl = async (url: string): Promise<string> => {
  try {
    const code = nanoid(6);

    await urldb.create({
      code,
      originalUrl: url,
    });

    return code;
  } catch (error) {
    console.log("Error creating short url: ", error);
    throw error;
  }
};

export const customExtension = async (
  customName: string,
  url: string
): Promise<string> => {
  try {
    const code = nanoid(3);
    const fullcode = customName + "-" + code;

    await urldb.create({
      code: fullcode,
      originalUrl: url,
    });

    return fullcode;
  } catch (error) {
    console.log("Error creating custom short url: ", error);
    throw error;
  }
};
