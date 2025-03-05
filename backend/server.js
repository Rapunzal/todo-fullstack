import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./db.js";

const app = express();
const port = 8080;
app.use(cors());
app.get("/test", (req, res) => {
  res.json("Hello World!");
});

app.listen(port, () => {
  console.log(`Listening to port on ${port}`);
  connectDb();
});
