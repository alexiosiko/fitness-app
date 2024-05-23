// store/useStore.js
import { create } from 'zustand';

export const useSettings = create((set) => ({
  selectedDate: new Date(),
  setSelectedDate: (newDate: Date) => set({ selectedDate: newDate }),
}));
