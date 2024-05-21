export type Day = {
	date: Date,
	activities: Activity[]
}
export type Activity = {
	name: string,
	calories: number,
}
export type UserDataType = { 
	_id: string,
	userId: string,
	dailyCalorieTarget: number,
	calendar: Day[]
}