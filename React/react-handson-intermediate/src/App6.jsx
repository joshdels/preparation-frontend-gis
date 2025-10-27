// 🧭 14. Auth Context (Fake Login System) - on going

// Concepts: Context API, Conditional Rendering, useEffect
// 🧩 Goal:
// Create a context that stores a fake user object (e.g., {name: "Joshua"}).
// “Login” and “Logout” buttons toggle it.
// 🎯 Bonus:
// Persist the user session in localStorage.
// Add “Welcome back!” message if user reloads.

import { useContext } from "react";
import { AuthContext }  from "./context/AuthContext";
import Login from "./layout/Login";
import DashBoard from "./layout/Dashboard.jsx";

export default function App6() {
  const { user } = useContext(AuthContext)

  return (
    <>
      {user ? <DashBoard/> : <Login/>};
    </>
  )
}