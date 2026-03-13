import { Router } from "express";
import {
  shortenUrl,
  visiturl,
  shortenUrlcustom,
} from "../controllers/urlcontrollers.js";
import { ratelimiter } from "../middlewares/ratelimiter.js";

const router = Router();

router.post("/shortenurl", ratelimiter, shortenUrl);
router.get("/:code", ratelimiter, visiturl);
router.post("/cmshortenurl", ratelimiter, shortenUrlcustom);
export default router;
