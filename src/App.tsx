import { useState } from "react";
import "./App.css";
import { Todo } from "./Todo";

function App() {
  const [todos, setTodos] = useState<Array<Todo>>([]);

  const [newTitle, setNewTitle] = useState("");

  function addTodo(title: String) {
    let maxId = 0;

    for (const todo of todos) {
      maxId = Math.max(todo.id, maxId);
    }

    const newTodo = { id: maxId + 1, title: title, completed: false };
    setTodos([...todos, newTodo]);
  }
  function setTodoComplete(id: number, completed: boolean) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: completed } : todo
      )
    );
  }

  function deleteTodo(id: number) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  const numTodos = todos.length;
  const numCompletedTodos = todos.filter(todo => todo.completed).length;
  const numIncompletedTodos = numTodos-numCompletedTodos;

  return (
    <div className="App">
      <h1>Todos</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addTodo(newTitle);
          setNewTitle("");
        }}
      >
        <input
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul className="TodoList">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={
              todo.completed
                ? "TodoItem TodoItem--Completed"
                : "TodoItem TodoItem--Incomplete"
            }
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(event) =>
                setTodoComplete(todo.id, event.target.checked)
              }
            />
            <span className="todoItem__Text">
              {todo.completed ? "DONE" : "TODO"} {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        {numTodos} todos ({numIncompletedTodos} incomplete, {numCompletedTodos} {" "}
        completed)
      </div>
    </div>
  );
}

export default App;
