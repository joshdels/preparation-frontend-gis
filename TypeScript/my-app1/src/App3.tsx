import { UserCard } from "./components/UseCard"
import { useState } from "react"

export default function App3(){
  const [count, setCount] = useState<number>(0);
  return (
    <>
       <UserCard name={"Joshua"} isOnline={false} />
       <UserCard name={"Jenny"} age={12} isOnline={true} />
       <p>Count: {count}</p>
       <button onClick={() => setCount(count + 2)}>Add 2</button>
    </>
  )
}











