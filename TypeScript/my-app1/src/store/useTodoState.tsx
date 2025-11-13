import { create } from "zustand";

interface Todo {
  id: number,
  title: string,
  done: boolean,
}

interface TodoState {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
}

const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  addTodo: (title) => 
    set((state) => ({
      todos: [...state.todos, {id: Date.now(), title, done: false}],
    })),
  toggleTodo: (id) => 
    set((state) => ({
      todos: state.todos.map((todo) => 
        todo.id === id? {...todo, done: !todo.done}: todo)
    }))
}))

export default useTodoStore;
