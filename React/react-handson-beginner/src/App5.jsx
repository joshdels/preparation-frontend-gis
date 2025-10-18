import { useState, useEffect } from 'react'
import './App.css'


export default function App5() {
  const[theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  function toggleTheme() {
    setTheme(prev=> (prev === 'light' ? 'dark' : 'light'));
  }

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme])

  return(
    <div className={`app-container ${theme}-theme`}>
      <h1>DarkMode</h1>
      <button
        onClick={toggleTheme}
      >Switch to {theme === 'light' ? 'dark' : 'light'}</button>
    </div>
  )
}



