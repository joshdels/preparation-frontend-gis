// 🌙 13. Global Theme Toggle -on going

// Concepts: Context API, State Management
// 🧩 Goal:
// Build a ThemeContext that manages light or dark mode globally.
// Two components (e.g. Navbar, Card) should react to the theme.
// 🎯 Bonus:
// Save theme preference in localStorage with useEffect.
// Add smooth background transition.

import { createContext, useContext, useState, useEffect } from 'react'
import './styles/index.css'


const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function Profile() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <>
      <h1>Hello, {theme}</h1>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Change
      </button>
    </>
  );
}

function Navbar() {
  const { theme } = useContext(ThemeContext)
  
  return(
    <>
      <div className={`container-${theme}`}>
        <h1>This is Navbar</h1>
        <hr />
      </div>
    </>
  ) 
}

function Card() {
  const {theme} = useContext(ThemeContext)
  
  return(
    <>
      <div className={`container-${theme}`}>
        <h3>Card Name</h3>
      </div>
    </>
  )
}

export default function App5() {
  return (
    <ThemeProvider>
        <Profile/>
        < Navbar/>
        < Card/>
    </ThemeProvider>
  )
}