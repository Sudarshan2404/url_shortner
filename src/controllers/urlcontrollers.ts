import type { Request, Response } from 'express';

export const shortenUrl = async (req: Request, res: Response) => {
  const url = req.body.url;
  
};
