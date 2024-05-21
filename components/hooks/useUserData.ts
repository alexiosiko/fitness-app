import { getTodayData } from '@/constants/lib/user';
import { Day, UserDataType } from '@/constants/types/user';
import axios from 'axios';
import { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message';

export default function useUserData() {
	const [userData, setUserData] = useState<UserDataType | undefined>(undefined);
	const [todayData, setTodayData] = useState<Day | undefined>(undefined);
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const getUserData = async () => {
		setIsFetching(true);
		try {
			const res = await axios.post(process.env.EXPO_PUBLIC_API_DOMAIN + "/users", {
				userId: "user_2gjzcChu1NiUDaw0PKQTW7v4Wgv"
			});
			if (res.status != 200)
				throw Error("Could get user");
			const user: UserDataType = JSON.parse(res.data.user);
			setUserData(user);
			setTodayData(getTodayData(user));
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
	const getRemainingCalories = (): number | null => {
		if (!userData || !todayData?.activities)
			return null;
		let remainingCalories = userData.dailyCalorieTarget;
		todayData.activities.forEach((activity => remainingCalories -= activity.calories))
		return remainingCalories ;//userData.dailyCalorieTarget - userData.eaten + userData.burned;
	}
	const getEatenCalories = (): number | null => {
		if (!userData || !todayData)
			return null;
		let eatenCalories = 0;
		todayData.activities.forEach((activity => {
			if (activity.calories > 0)
				eatenCalories += activity.calories
		}))
		return eatenCalories ;//userData.dailyCalorieTarget - userData.eaten + userData.burned;
	}
	const getBurnedCalories = (): number | null => {
		if (!userData || !todayData)
			return null;
		let burnedCalories = 0;
		todayData.activities.forEach((activity => {
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
		todayData,
		getEatenCalories,
		getBurnedCalories,
		setTodayData
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