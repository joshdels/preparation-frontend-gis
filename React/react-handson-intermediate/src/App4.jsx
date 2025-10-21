import { useState, useEffect } from 'react';

export default function App5() {
  const [count, setCount] = useState(0);
  const [countDown, setCountDown] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return
    const intervalId = setInterval(() => {
      setCount(c => c + 1); // ✅ Pass a state updater
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isRunning]); // ✅ Now count is not a dependency! 

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCountDown(c => c - 1);
    }, 1000);
    return () => clearInterval(intervalID);
  }, []);


  function handleStart() {
    setIsRunning(true);
  }

  function handleStop() {
    setIsRunning(false);
  }

  function handleInput(e) {
    setCountDown(e.target.value);
    console.log(countDown);
  }

  //Digital Clock
  return (
    <>
      <h1>Digital Clock</h1>
      <hr />
      <h1>{count}</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <hr />
      <CountDown 
        textInput={handleInput}
      />
    </>
  )
}

function CountDown({textInput}) {
  return (
    <>
      <hr />
      <h3>Count Down</h3>
      <input 
        type="number"
        onChange={textInput}
      />
      // ang input mu enter how much time to be inserted
      // then reuse the start and Stop
      // add guro kog reset
      // 11pm ganna sleep na


    </>
  )
}