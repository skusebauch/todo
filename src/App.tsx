import React, { useState } from "react";
import "./App.css";

// reference a type
type FormElem = React.FormEvent<HTMLFormElement>;

// create a new type
interface ITodo {
  text: string;
  complete: boolean;
}

function App() {
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([]);

  const handleSubmit = (event: FormElem) => {
    event.preventDefault();
    addTodo(value);
    setValue("");
  };

  const addTodo = (text: string) => {
    const newTodos: ITodo[] = [{ text, complete: false }, ...todos];
    setTodos(newTodos);
  };

  const completeTodo = (index: number) => {
    const newTodos: ITodo[] = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };

  const removeTodo = (index: number) => {
    // can also use filter with prevTodo - just wanted to keep simple
    const newTodos: ITodo[] = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  console.log(todos);
  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          required
        />
        <button type="submit">Add Todo</button>
      </form>
      <section>
        {todos.map((todo: ITodo, index: number) => (
          <div
            style={{ textDecoration: todo.complete ? "line-through" : "" }}
            key={index}
          >
            <h3>{todo.text}</h3>
            <button type="button" onClick={() => completeTodo(index)}>
              {todo.complete ? "done" : "not done yet"}
            </button>
            <button
              type="button"
              onClick={() => removeTodo(index)}
              style={{ marginLeft: 10, backgroundColor: "red" }}
            >
              &times;
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
