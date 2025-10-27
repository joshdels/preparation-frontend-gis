import { useState } from "react"
import useLocalStorage from "./useLocalStorage";

export default function useCounter(initial = 0) {
  const [count, setCount] = useLocalStorage(initial);



  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  const reset = () => setCount(initial);


  return { count, increment, decrement, reset }
}