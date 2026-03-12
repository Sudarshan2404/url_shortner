import { Router } from "express";
import { shortenUrl, visiturl } from "../controllers/urlcontrollers.js";

const router = Router();

router.post("/shortenurl", shortenUrl);
router.get("/:code", visiturl);
export default router;
