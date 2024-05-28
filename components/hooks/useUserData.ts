import { Day, UserDataType } from '@/constants/types/user';
import { useUser } from '@clerk/clerk-expo';
import axios from 'axios';
import { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message';
import { useSettings } from '../state/settings';
import { isSameDay, normalizeDateString } from '@/constants/lib/day';

export default function useUserData() {
	const { user } = useUser();
	const [ userData, setUserData] = useState<UserDataType | undefined>(undefined);
	const { selectedDate } = useSettings() as any;
	const [ selectedDayData, setSelectedDayData ] = useState<Day | undefined>(undefined);
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const getUserData = async () => {
		setIsFetching(true);
		try {
			const userId = user?.id;
			if (userId == undefined)
				throw Error("Couldn't retrieve user from Clerk Database :(");
			const res = await axios.post(process.env.EXPO_PUBLIC_API_DOMAIN + "/users", {
				userId: userId
			});
			if (res.status != 200)
				throw Error("Couldn't get user");

			// Parse because objects in children
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
	const getSelectedDayData = (): Day | undefined => {
		let dayData: Day | undefined = undefined;
		userData?.days.forEach(day => {
			if (isSameDay(day.date, selectedDate)) {
				dayData = day;
				return; // Return from forEach
			}
		});
		if (dayData == undefined) {
			dayData = {
				exercises: [],
				foods: [],
				date: new Date()
			};
		}
		return dayData;
	}
	
	const getRemainingCalories = (day: Day): number | null => {
		if (!userData || !day?.foods)
			return null;
		let remainingCalories = userData.dailyCalorieTarget;
		day.foods.forEach((food => remainingCalories -= food.calories))
		day.exercises.forEach(exercise => remainingCalories += exercise.calories);
		return remainingCalories; //userData.dailyCalorieTarget - userData.eaten + userData.burned;
	}
	const getEatenCalories = (day: Day): number | null => {
		if (!userData || !day)
			return null;
		let eatenCalories = 0;
		day.foods.forEach((activity => {
			eatenCalories += activity.calories
		}))
		return eatenCalories ;//userData.dailyCalorieTarget - userData.eaten + userData.burned;
	}
	const getBurnedCalories = (day: Day): number | null => {
		if (!userData || !day)
			return null;
		let burnedCalories = 0;
		day.exercises.forEach((exercise => {
			burnedCalories += exercise.calories
		}))
		return burnedCalories ;//userData.dailyCalorieTarget - userData.eaten + userData.burned;
	}

	useEffect(() => {
		if (isFetching)
			return;
		getUserData();
	}, [])
	

	useEffect(() => {
		if (userData && selectedDate)
			setSelectedDayData(getSelectedDayData());
	}, [userData, selectedDate])

 	return {
		userData,
		getRemainingCalories,
		isFetching,
		getEatenCalories,
		getBurnedCalories,
		setUserData,
		getUserData,
		selectedDayData
	}
}


