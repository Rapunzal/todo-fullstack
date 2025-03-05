import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./db.js";
import Todo from "./models/todoModel.js";

const app = express();
const port = 8080;
app.use(cors());
app.use(express.json());

app.get("/api/todos", async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

app.post("/api/todos", async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    console.log(todo);
    res.status(201).json(todo);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

app.delete("/api/todos/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Todo.findByIdAndDelete(id);
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

app.put("/api/todos/:id", async (req, res) => {
  const id = req.params.id;
  try {
    console.log(req.body, " put");
    const result = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

app.listen(port, () => {
  console.log(`Listening to port on ${port}`);
  connectDb();
});
