// store/useStore.js
import { create } from 'zustand';

export type useSettingsType = {
	selectedDate: Date,
	setSelectedDate: (newDate: Date) => void
}

export const useSettings = create<useSettingsType>((set) => ({
	selectedDate: new Date(),
	setSelectedDate: (newDate: Date) => set({ selectedDate: newDate }),
}));
