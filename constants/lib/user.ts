import { Day, UserDataType } from "../types/user";

export function getTodayData(userData: UserDataType): Day {
	const todaysDate = new Date();
	let newDay: Day = {
		activities: [],
		date: new Date(),
	}
	userData.calendar.forEach(day => {
		const newDate = new Date(day.date);
		if (isSameDay(todaysDate, newDate)) {
			newDay = {
				activities: day.activities,
				date: new Date(day.date)
			};
		}
	})
	// Return empty day cause there is none in DB
	return newDay;
}

export const isSameDay = (date1: Date, date2: Date): boolean => {
	const date1day = date1.getDay();
	const date1month = date1.getMonth();
	const date1year = date1.getFullYear();

	const date2day = date2.getDay();
	const date2month = date2.getMonth();
	const date2year = date2.getFullYear();
	
	if (date1day != date2day)
		return false;
	if (date1month != date2month)
		return false;
	if (date1year != date2year)
		return false;

	return true;
}