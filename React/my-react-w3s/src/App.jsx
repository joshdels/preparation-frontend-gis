import { useState, useEffect } from 'react'


/* export default function App() {
  const [car, setCar] = useState({
    brand: "Ford",
    model: "Mustang",
    year: "1964",
    color: "red"
  });


  return (
    <>
      <h1>
        My { car.brand }
      </h1>
      <p>
        It is a {car.color} {car.model} from {car.year}.
      </p>
    </>
  )
} */

// export default function App() {
//   // Example of useEffect in control
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     setTimeout(() => {
//       setCount((count) => count + 2)
//     }, 2000);
//   }, []);

//   return (
//     <h1> I've rendered {count} times! </h1>
//   )
// }

// export default function App() {
//   const [count, setCount] = useState(0);
//   const [calculation, setCalculation] = useState(0);

//   useEffect(() => {
//     setCalculation(() => count * 3);
//   }, [count]);


//   return (
//     <>
//       <p>Count: {count}</p>
//       <button onClick={() => setCount((c) => c + 1)}>+</button>
//       <p>Caclulation: {calculation}</p>
//     </>
//   )
// }

export default function App() {
  return (
    <>
      <MyForm />
    </>
  )
}

function MyForm() {
  const [name, setName] = useState("Joshua");

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e){
    e.preventDefault();
    alert(name);
  }

  return(
    <form onSubmit={handleSubmit}>
      <label>Enter your name:
          <input 
            type="text"
            value={name}
            onChange={handleChange} 
          />
      </label>
      {/* <p>Current Value: {name}</p> */}
      <input type="submit" />
    </form>
  )
}
