import React, { useState, useEffect } from "react";
import "./App.css";
// import components
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  //state stuff
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFileteredTodos] = useState([]);
  // Functions
  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFileteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFileteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFileteredTodos(todos);
        break;
    }
  };
  // Save to local
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  // Get local Todos

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };
  // Run once when thhe app start
  useEffect(() => {
    getLocalTodos();
  }, []);

  // USE EFFECT
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  return (
    <div className="App">
      <header>
        <h1>To Do List</h1>
      </header>
      <Form
        inputText={inputText}
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <TodoList
        setTodos={setTodos}
        todos={todos}
        filteredTodos={filteredTodos}
      />
    </div>
  );
}

export default App;
