import { create } from 'zustand';

const useCartStore = create((set) => ({
  item: '',
  items: [],
  
  setItem: (value) => set({ item: value }),

  // 💡 self-contained submit handler
  addItem: (e) => {
    e.preventDefault(); // handles form submission inside the store
    set((state) => {
      if (!state.item.trim()) return state; // ignore empty input
      return { 
        items: [...state.items, state.item], 
        item: '' 
      };
    });
  },

  clearCart: () => set({ items: [], item: '' }),
}));

export default useCartStore;
