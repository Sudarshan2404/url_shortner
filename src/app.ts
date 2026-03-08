import Express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";

dotenv.config();
const app = Express();
const port = 3000;
connectDb();
app.use(Express.json());

app.get("/", (req, res) => {
  res.send("HEllo");
});

app.listen(port, () => {
  console.log(`Server listening on: http://localhost:${port}`);
});
