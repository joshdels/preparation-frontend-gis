import { useEffect } from "react";
import useUserStore from "./store/useUserStore";
import useTheme from "./store/useTheme";

export default function UserList() {
  const { users, loading, fetchUsers } = useUserStore();
  const {theme, toggleTheme} = useTheme();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) return <p>Loading Sir...</p>;
  return (
    <>
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
    <h3>Use Theme {theme}</h3>
    <button onClick={toggleTheme}>Switch</button>
    </>
    
  );
}
