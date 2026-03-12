import { Router } from "express";
import {
  shortenUrl,
  visiturl,
  shortenUrlcustom,
} from "../controllers/urlcontrollers.js";

const router = Router();

router.post("/shortenurl", shortenUrl);
router.get("/:code", visiturl);
router.post("/cmshortenurl", shortenUrlcustom);
export default router;
