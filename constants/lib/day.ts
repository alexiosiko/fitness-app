import { Day, UserDataType } from "../types/user";

export function normalizeDateString(dateStr: string | Date): Date {
	const date = new Date(dateStr);
	date.setHours(0);
	date.setMinutes(0);
	date.setSeconds(0);
	date.setMilliseconds(0);
	return date;
}


export function isSameDay(date1: string | Date, date2: string | Date): boolean {
	const d1 = normalizeDateString(date1);
	const d2 = normalizeDateString(date2);
	return d1.getFullYear() === d2.getFullYear() &&
		d1.getMonth() === d2.getMonth() &&
		d1.getDate() === d2.getDate();
}

export function getDay(userData: UserDataType, selectedDate: Date): Day | undefined {
	return userData?.days.find(day => normalizeDateString(day.date) === normalizeDateString(selectedDate));
}	