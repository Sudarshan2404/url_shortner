import type { Request, Response } from "express";
import { createShortUrl, customExtension } from "../Services/url.services.js";
import { urldb } from "../models/urls.js";
import { ZodNull } from "zod";

export const shortenUrl = async (req: Request, res: Response) => {
  try {
    const url = req.body.url;

    const shortUrl = await createShortUrl(url);

    res.status(200).json({ shortenUrl: `http://localhost:3000/${shortUrl}` });
  } catch (error) {
    console.log("Error Occured while shortening url: ", error);
    res.status(500).json("Internal Error Occured");
  }
};

export const visiturl = async (req: Request, res: Response) => {
  type UrlRecord = {
    _id: object;
    code: string;
    originalUrl: string;
    clicks?: number | null;
  };

  try {
    const code: string = req.params.code as string;
    if (!code) {
      return res.status(400).json("Invalid link or link expired");
    }
    const urlRecord: UrlRecord | null = await urldb.findOne({
      code: code,
    });

    if (!urlRecord) {
      throw new Error("Input a valid shortened url or link expired");
    }
    var clicks = urlRecord?.clicks ?? 0;
    clicks = clicks + 1;

    await urldb.updateOne({ _id: urlRecord._id }, { $set: { clicks } });

    console.log(code, urlRecord?.clicks);

    res.status(200).redirect(urlRecord.originalUrl);
  } catch (error) {
    console.log("Error Occurred while visiting url: ", error);
    res.status(500).json("Internal Error Occurred");
  }
};

export const shortenUrlcustom = async (req: Request, res: Response) => {
  try {
    const url: string = req.body.url;
    const customName: string = req.body.customName;
    const shortUrl = await customExtension(customName, url);

    res.status(200).json({ shortenUrl: `http://localhost:3000/${shortUrl}` });
  } catch (error) {
    res.status(500).json("Internal server Error");
  }
};
