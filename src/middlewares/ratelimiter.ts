import type { Request, Response, NextFunction } from "express";

const requests: Record<string, { count: number; startTime: number }> = {};

export const ratelimiter = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ip: string | undefined = req.ip;
    if (!ip) {
      throw new Error("IP is not provided");
    }
    const max_time = 60 * 1000;
    const currentTime = Date.now();
    const max_requests = 100;

    if (!requests[ip]) {
      requests[ip] = { count: 1, startTime: currentTime };
    }

    const elapsedTime = currentTime - requests[ip].startTime;

    if (elapsedTime > max_time) {
      requests[ip] = { count: 1, startTime: currentTime };
    }

    if (requests[ip].count >= max_requests) {
      return res.status(429).json("Too Many Requests");
    }

    requests[ip].count++;

    next();
  } catch (error) {
    res.status(500).json("Something went wrong or an internal server error");
  }
};
