import type { Request, Response } from "express";
import { createShortUrl } from "../Services/url.services.js";
import { urldb } from "../models/urls.js";
import { ZodNull } from "zod";

export const shortenUrl = async (req: Request, res: Response) => {
  try {
    const url = req.body.url;

    const shortUrl = await createShortUrl(url);

    res.status(200).json(`http://localhost:3000/${shortUrl}`);
  } catch (error) {
    console.log("Error Occured while shortening url: ", error);
    res.status(500).json("Internal Error Occured");
  }
};

export const visitUrl = async (req: Request, res: Response) => {
  type UrlRecord = {
    code: string;
    originalUrl: string;
    clicks?: number | null;
  };

  try {
    const code: string | string[] | undefined = req.params.code;
    if (!code) {
      throw new Error("Code is not defined");
    }
    const urlRecord: UrlRecord | null = await urldb.findOne({
      code: code,
    });

    if (!urlRecord) {
      throw new Error("Input a valid shortened url");
    }

    res.status(200).json(urlRecord.originalUrl);
  } catch (error) {
    console.log("Error Occurred while visiting url: ", error);
    res.status(500).json("Internal Error Occurred");
  }
};
