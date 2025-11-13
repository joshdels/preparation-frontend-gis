import { useState } from "react"

type Todo = {
  id: number;
  title: string;
  done: boolean;
}

export default function TodoList() {
   const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: "todo-me", done: true},
    { id: 2, title: "medomi", done: false},
   ])  

   const toggle = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, done: !todo.done} : todo
    ));
   }

   return (
    <ul>
      {todos.map(todo => 
        <li key={todo.id} onClick={() => toggle(todo.id)}>
          {todo.done ? "Yes" : "No" } {todo.title}
        </li>
      )}
    </ul>
   )
}