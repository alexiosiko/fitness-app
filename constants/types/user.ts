export type Day = {
	date: Date,
	activities: activity[]
}
export type activity = {
	name: string,
	calories: number,
}
export type UserDataType = { 
	_id: string,
	userId: string,
	dailyCalorieTarget: number,
	calendar: Day[]
}