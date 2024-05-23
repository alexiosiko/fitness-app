import { getTodayData as getDayData, isSameDay } from '@/constants/lib/user';
import { Day, UserDataType } from '@/constants/types/user';
import { useUser } from '@clerk/clerk-expo';
import axios from 'axios';
import { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message';
import { useSettings } from '../state/settings';

export default function useUserData() {
	const { user } = useUser();
	const [ userData, setUserData] = useState<UserDataType | undefined>(undefined);
	const { selectedDate, setSelectedDate } = useSettings() as any;
	const [ selectedDayData, setSelectedDayData ] = useState<Day | undefined>(undefined);
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const getUserData = async () => {
		setIsFetching(true);
		try {
			const userId = user?.id;
			if (userId == undefined) {
				Toast.show({
					type: 'error',
					text1: "Couldn't retrieve user from Clerk Database :(",
				})
				return;
			}
			const res = await axios.post(process.env.EXPO_PUBLIC_API_DOMAIN + "/users", {
				userId: userId
			});
			if (res.status != 200)
				throw Error("Could get user");
			const userData: UserDataType = JSON.parse(res.data.user);
			setUserData(userData);
		} catch (e: any) {
			Toast.show({
				type: 'error',
				text1: "Error",
				text2: "Error getting user data :("
			})
		} finally {
			setIsFetching(false);
		}
	}
	useEffect(() => {
		setSelectedDayData(getSelectedDayData());
	}, [selectedDate, userData])
	const getSelectedDayData = () => {
		console.log("getting selected day data");
		let dayData: Day | undefined = undefined;
		userData?.calendar.forEach(day => {
		console.log(day);
		const dayDate = new Date(day.date);
			if (isSameDay(dayDate, selectedDate)) {
				dayData = day;
				return;
			}
		})
		if (dayData === undefined) {
			Toast.show({
				text1: `No data found for ${selectedDate.toDateString()}`
			})
		} else {
			Toast.show({
				text1: "dayDAta found"
			})
		}

		return dayData;
	}
	const getRemainingCalories = (): number | null => {
		if (!userData || !selectedDayData?.activities)
			return null;
		let remainingCalories = userData.dailyCalorieTarget;
		selectedDayData.activities.forEach((activity => remainingCalories -= activity.calories))
		return remainingCalories; //userData.dailyCalorieTarget - userData.eaten + userData.burned;
	}
	const getEatenCalories = (): number | null => {
		if (!userData || !selectedDayData)
			return null;
		let eatenCalories = 0;
		selectedDayData.activities.forEach((activity => {
			if (activity.calories > 0)
				eatenCalories += activity.calories
		}))
		return eatenCalories ;//userData.dailyCalorieTarget - userData.eaten + userData.burned;
	}
	const getBurnedCalories = (): number | null => {
		if (!userData || !selectedDayData)
			return null;
		let burnedCalories = 0;
		selectedDayData.activities.forEach((activity => {
			if (activity.calories < 0)
				burnedCalories -= activity.calories
		}))
		return burnedCalories ;//userData.dailyCalorieTarget - userData.eaten + userData.burned;
	}

	useEffect(() => {
		if (isFetching)
			return;
		if (userData)
			return;
		getUserData();
	}, [])
	
 	return {
		userData,
		getRemainingCalories,
		isFetching,
		todayData: selectedDayData,
		getEatenCalories,
		getBurnedCalories,
		setTodayData: setSelectedDayData
	}
}


const sampleTodayData: Day = {
	activities: [ 
		{
			calories: 200,
			name: 'strawberries'
		},
		{
			calories: -500,
			name: 'running'
		},
		{
			calories: 1200,
			name: 'burger'
		},
	],
	date: new Date(),
}