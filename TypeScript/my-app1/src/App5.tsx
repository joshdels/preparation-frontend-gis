import { useState } from "react";
import useCounterStore from "./store/useCounterState";
import useTodoStore from "./store/useTodoState";

export default function App5() {
  const { count, increase, decrease } = useCounterStore();
  const { todos, addTodo, toggleTodo } = useTodoStore();

  const [newTodo, setNewTodo] = useState<string>("")


  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increase}>Increase</button>
      <button onClick={decrease}>Decrease</button>

      <input 
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New todo"
      />

      <button
        onClick={() => {
          if (newTodo.trim() !== "") {
            addTodo(newTodo);
            setNewTodo("");
          }
        }}
      >ADD</button>

      <h1>Todo</h1>
      <input type="text" />
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            style={{
              textDecoration: todo.done ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
