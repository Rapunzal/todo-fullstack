import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./db.js";
import Todo from "./models/todoModel.js";
import User from "./models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
const port = 8080;

app.use(express.json());
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

app.post("/api/signup", async (req, res) => {
  console.log(req.body, "hello");
  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPassword;
  try {
    const user = await User.create(req.body);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "User Not Found" });
  }
});

app.post("/api/login", async (req, res) => {
  let { email, password } = req.body;
  console.log(email, " email");
  const userDoc = await User.findOne({ email: email });

  if (!userDoc) {
    res.status(404).json({ error: " No such user exists" });
  }

  let isPasswordValid = await bcrypt.compare(password, userDoc.password);
  if (!isPasswordValid) {
    res.status(201).json({ error: "wrong password" });
  }
  console.log("🚀 ~ app.post ~ isPasswordValid:", isPasswordValid);
  console.log("🚀 ~ app.post ~ userDoc:", userDoc);
  console.log("🚀 ~ app.post ~ password:", password);
  console.log("🚀 ~ app.post ~ email:", email);
  let key = process.env.JWT_Key;
  let token = jwt.sign({ email }, key, { expiresIn: "1d" });
  res.json({ token, email, id: userDoc._id });
});

app.listen(port, () => {
  console.log(`Listening to port on ${port}`);
  connectDb();
});
