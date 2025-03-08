import React from "react";

export const Todo = () => {
  const [todos, setTodos] = useState([]);
  const textRef = useRef();
  async function getTodos() {
    // const response = await fetch("http://localhost:8080/api/todos");
    const response = await fetch(`${BASE_URL}/api/todos`);
    const result = await response.json();
    setTodos(result);
  }
  useEffect(() => {
    getTodos();
  }, []);
  async function handleSubmit(e) {
    e.preventDefault(); //not refresh page

    const todo = {
      text: textRef.current.value,
    };
    console.log(todo, " todo ref");
    const response = await fetch(`${BASE_URL}/api/todos`, {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-type": "application/json",
      },
    });
    const todoDoc = await response.json();
    setTodos([...todos, todoDoc]);
    console.log(todoDoc);
  }
  const handleDelete = async (id) => {
    await fetch(`${BASE_URL}/api/todos/${id}`, {
      method: "DELETE",
    });
    getTodos();
  };
  const handleComplete = async (id) => {
    const currentTodo = todos.find((todo) => todo._id === id);
    currentTodo.completed = !currentTodo.completed;
    await fetch(`${BASE_URL}/api/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(currentTodo),
      headers: {
        "Content-type": "application/json",
      },
    });
    getTodos();
  };

  return (
    <>
      <h1>Todos</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={textRef} />
        <button>Submit</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleComplete(todo._id)}
            />
            {todo.text}
            <button onClick={() => handleDelete(todo._id)}>X</button>
          </li>
        ))}
      </ul>
    </>
  );
};
