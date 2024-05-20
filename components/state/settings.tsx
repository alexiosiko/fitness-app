// store/useStore.js
import { create } from 'zustand';

export const useSettings = create((set) => ({
  dailyCalorieTarget: 0,
  setDailyCalorieTarget: (newTarget: number) => set({ dailyCalorieTarget: newTarget }),
}));
