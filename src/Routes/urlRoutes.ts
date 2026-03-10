import { Router } from "express";
import { shortenUrl } from "../controllers/urlcontrollers.js";

const router = Router();

router.get("/shortenurl", shortenUrl);

export default router;
