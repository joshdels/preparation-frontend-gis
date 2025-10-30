import { create } from "zustand";

const useUserStore = create((set) => ({
  users: [],
  loading: false,
  fetchUsers: async () => {
    set({ loading: true });
    
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    set({ users: data, loading: false });
  },
}));

export default useUserStore;
