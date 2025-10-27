import {useState, useContext} from 'react';
import { AuthContext } from '../context/AuthContext';


export default function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError ] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const success = login(username, password)
    if (!success) setError("Invalid credentials")
  };

  function handleUsername(e){
    setUsername(e.target.value);
  };

  function handlePassword(e){
    setPassword(e.target.value);
  };

  return (
    <>
    <div className="max-w-sm mx-auto mt-10 border border-gray-300 p-6 rounded-lg shadow-sm bg-white">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">Login</h2>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            onChange={handleUsername}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 font-medium mb-2">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={handlePassword}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <button 
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
          Login
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
    </>
  )
}