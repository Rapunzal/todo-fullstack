import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  text: { type: String },
  completed: { type: Boolean, default: false },
});

const Todo = mongoose.model("Todo", todoSchema); //Collection in database called todos(because it makes it lowercase and adds s)

export default Todo;
