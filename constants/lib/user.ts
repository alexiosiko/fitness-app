import { Day, UserDataType } from "../types/user";

export function getTodayData(userData: UserDataType): Day | undefined {
	const date = new Date();
	console.log(date);
	userData.calendar.forEach(day => {
		const todayYear = date.getFullYear();
		const todayDay = date.getDay();
		if (todayYear == day.date.getFullYear() &&
		todayDay == day.date.getDay())
			return day;
	})
	return undefined;
}