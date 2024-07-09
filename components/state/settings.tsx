// store/useStore.js
import { create } from 'zustand';

export type useSettingsType = {
  selectedDate: Date,
  setSelectedDate: (newDate: Date) => void,
  incrementSelectedDate: () => void,
  decrementSelectedDate: () => void
}

export const useSettings = create<useSettingsType>((set) => ({
  selectedDate: new Date(),
  setSelectedDate: (newDate: Date) => set({ selectedDate: newDate }),
  incrementSelectedDate: () => {
    set((state) => {
      const nextDay = new Date(state.selectedDate);
      nextDay.setDate(nextDay.getDate() + 1);
      return { selectedDate: nextDay };
    });
  },
  decrementSelectedDate: () => {
    set((state) => {
      const prevDay = new Date(state.selectedDate);
      prevDay.setDate(prevDay.getDate() - 1);
      return { selectedDate: prevDay };
    });
  }
}));
