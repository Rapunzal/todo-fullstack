import { useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const textRef = useRef();
  async function getTodos() {
    const response = await fetch("http://localhost:8080/api/todos");
    const result = await response.json();
    setTodos(result);
  }
  useEffect(() => {
    getTodos();
  }, []);
  async function handleSubmit(e) {
    e.preventDefault(); //not refresh page
    console.log("handleSubmit");
    console.log(textRef.current.value);
    const todo = {
      text: textRef.current.value,
    };
    setTodos([...todos, todo]);
    const response = await fetch("http://localhost:8080/api/todos", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-type": "application/json",
      },
    });
    console.log(response);
  }
  return (
    <>
      <h1>Todos</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={textRef} />
        <button>Submit</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li>{todo}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
