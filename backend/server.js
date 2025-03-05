import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./db.js";
import Todo from "./models/todoModel.js";

const app = express();
const port = 8080;
app.use(cors());
app.get("/api/todos", async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

app.listen(port, () => {
  console.log(`Listening to port on ${port}`);
  connectDb();
});
