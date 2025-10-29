import { create } from 'zustand'

export const useMapToggler = create((set) => ({
  isOn: false,
  action: "removeLayer", // start with no layer
  toggle: () => set((state) => {
    const newIsOn = !state.isOn;
    return {
      isOn: newIsOn,
      action: newIsOn ? "addLayer" : "removeLayer",
    };
  }),
}));
