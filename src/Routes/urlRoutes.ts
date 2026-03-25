import { Router } from "express";
import {
  shortenUrl,
  visiturl,
  shortenUrlcustom,
} from "../controllers/urlcontrollers.js";
import { ratelimiter } from "../middlewares/ratelimiter.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/shortenurl", ratelimiter, authMiddleware, shortenUrl);
router.get("/:code", ratelimiter, visiturl);
router.post("/cmshortenurl", ratelimiter, authMiddleware, shortenUrlcustom);
export default router;
