import express from "express";

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.json("Hello World!");
});

app.listen(port, () => {
  console.log(`Connected to port on ${port}`);
});
