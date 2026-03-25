import Express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import urlroutes from "./Routes/urlRoutes.js";
import authroutes from "./Routes/authRoutes.js";
import { ratelimiter } from "./middlewares/ratelimiter.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = Express();
const port = 3000;
connectDb();

app.use(Express.json());

app.use(cookieParser());

app.get("/", ratelimiter, (req, res) => {
  res.send("HEllo");
});

app.use("/", urlroutes);
app.use("/api/auth", authroutes);

app.listen(port, () => {
  console.log(`Server listening on: http://localhost:${port}`);
});
