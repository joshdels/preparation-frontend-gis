import { useState, useEffect } from 'react';

export default function App5() {
  const [count, setCount] = useState(0);
  const [countDown, setCountDown] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCountDown, setIsCountDown] = useState(false);

  useEffect(() => {
    if (!isRunning) return
    const intervalId = setInterval(() => {
      setCount(c => c + 1); // ✅ Pass a state updater
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isRunning]); // ✅ Now count is not a dependency! 

  useEffect(() => {
    if (!isCountDown) return;
    if (countDown <= 0 ) {
      setIsCountDown(false);
      return;
    }  
    const intervalID = setInterval(() => {
      setCountDown(c => c - 1);
    }, 1000);
    return () => clearInterval(intervalID);
  }, [isCountDown]);


  function handleStart() {
    setIsRunning(true);
  }

  function handleStop() {
    setIsRunning(false);
  }

  function handleResetCount() {
    setCount(0);
    setIsRunning(false);
  }

  function handleInput(e) {
    setCountDown(Number(e.target.value));
  }

  function handleStartCountDown() {
    setIsCountDown(true);
  }


  //Digital Clock
  return (
    <>
      <h1>Digital Clock</h1>
      <hr />
      <h1>{count}</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleResetCount}>Reset</button>
      <hr />
      <CountDown 
        textInput={handleInput}
        countDown={countDown}
        onClick={handleStartCountDown}
      />
    </>
  )
}

function CountDown({countDown, textInput, onClick}) {
  return (
    <>
      <hr />
      <h3>Count Down</h3>
      <input 
        type="number"
        onChange={textInput}
      />
     
      {countDown === 0 
        ? (<h1> Tada! </h1> ) 
        : (<h3>{countDown} seconds remaining</h3>)}
      <button onClick={onClick}>Start Count Down</button>
    </>
  )
}