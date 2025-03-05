import { useEffect } from "react";
import "./App.css";

function App() {
  async function getData() {
    const response = await fetch("http://localhost:8080/test");
    const data = await response.json();
    console.log(data);
  }
  useEffect(() => {
    getData();
  }, []);

  return <>hey</>;
}

export default App;
