import { useState, useEffect } from 'react'

// export default function App() {
//   // Counter App
//   const [count, setCount] = useState(0)

//   function handleClick() {
//     setCount(count + 1);
//   }

//   function handleReset() {
//     setCount(0);
//   }

//   return (
//     <>
//       <h1>Counter</h1>
//       <button
//         type="button"
//         onClick={handleClick}
//       >
//         Add
//       </button>
//       <p>Value: {count} </p>
//       <button
//         type='button'
//         onClick={handleReset}
//       >Reset</button>
//     </>
//   )
// }



// export default function App() {
//   //Todo List App
//   const [task, setTask] = useState('');
//   const [actions, setActions] = useState([]);


//   function handleTasks(e) {
//     setTask(e.target.value);
//   }

//   function handleSubmit() {
//     console.log("submitted")
//     const newItem = {
//       id: Date.now().toString(),
//       task: task,
//     }

//     setActions(prev => [...prev, newItem])
//     setTask("")
//   }

//   function handleDelete(id) {
//     console.log("deleted")
//     setActions(prev => prev.filter(action=> action.id !== id))
//   }


//   return (
//     <>
//       <h1>Todo List</h1>
//       <input 
//         value={task}
//         onChange={handleTasks}
//       />
//       <button 
//         onClick={handleSubmit}
//       >
//         Add
//       </button>
//       <h3> 
//         {actions.length === 0 ? "No task yet" : "Tasks"}
//       </h3>

//       <ul>
//         {actions.map(action => (
//           <li key={action.id}>
//             <input type="checkbox" />
//             {action.task}
//             <button onClick={() => handleDelete(action.id)}>
//               delete
//             </button>
//           </li>
//         ))}
//       </ul>

//     </>
//   )
// }

export default function App() {
  //Feedback Form
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  function handleText(e) {
    setMessage(e.target.value);
  }

  function handleName(e) {
    setName(e.target.value);
  }
  
  function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    setTimeout(() => {
      alert(`This message ${message} ${name}`)
      setIsLoading(false);
    }, 2000);
  }


  return (
    <>
      <h1>Feedback Form</h1>
      <form onSubmit={handleSubmit}>
        <label>Your Name: </label>
        <input 
          type="text"
          value={name}
          onChange={handleName}
        />
        <br />
        <textarea 
          placeholder="Message"
          value={message}
          onChange={handleText}
          disabled={isLoading}
        >
        </textarea>
        <br />
        <input 
          type="submit" 
          value={isLoading ? "Submitting" :"Submit"} 
          disabled={isLoading}
        />
      </form>
    </>
  );
}




