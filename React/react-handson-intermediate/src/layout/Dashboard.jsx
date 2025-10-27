import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function DashBoard() {
  const { user, logout } = useContext(AuthContext)

  return (
    <div className="p-5">
      <h1 className="text-xl">Welcome, {user.username}!</h1>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded mt-3"
      >
        Logout
      </button>
    </div>
  );
}

