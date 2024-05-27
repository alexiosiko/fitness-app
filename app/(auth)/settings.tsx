import Text from '@/components/ui/text'
import { styles } from '@/constants/ui/styles'
import { useSettings } from '@/components/state/settings';
import React, { useState }  from 'react'
import { Keyboard, TextInput, View } from 'react-native'
import Button1 from '@/components/ui/button1';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import useUserData from '@/components/hooks/useUserData';
import { Calendar, DateData} from 'react-native-calendars'
export default function Settings() {
    const { selectedDate, setSelectedDate } = useSettings();
	const [ dailyCalorieTarget, setDailyCalorieTarget] = useState<number>(2000);
	const { userData } = useUserData();
	const [ isFetching, setIsFetching ] = useState<boolean>(false);
	const handleOnDailyCalorieTargetChange = (value: string) => {
		const numericValue = value.replace(/[^0-9]/g, '');
   	 	setDailyCalorieTarget(Number(numericValue));
	}
	const handleUpdate = async () => {
		if (isFetching)
			return;
		try {
			setIsFetching(true);
			if (userData?.userId == null) {
				console.error("User id null");
				return
			}
			const res = await axios.put(process.env.EXPO_PUBLIC_API_DOMAIN + "/users/update-calorie-target", {
				userId: userData?.userId,
				dailyCalorieTarget: dailyCalorieTarget,
			})
			if (res.status != 200)
				throw Error(res.data.message);
			Toast.show({
				text1: "Successfully update calorie target :D",
			})
			
			// inUserHookData, manually rerender due to useEffect dependency
			// A little weird to call it from here though
			setSelectedDate(new Date(selectedDate));
		} catch (e: any) {
			Toast.show({
				type: 'error',
				text1: "Error",
				text2: e.message
			})
		} finally {
			setIsFetching(false);
		}
	}
	const handleOnChangeDate = (dataData: DateData) => {
		const date = new Date(dataData.dateString);
		setSelectedDate(date)
	}
	return (
		<View onTouchStart={() => Keyboard.dismiss()} style={{ height: '100%', gap: 24, margin: 10}}>
			<View style={{ gap: 12 }}>
				<Text>{selectedDate.toDateString()}</Text>
				<Calendar 
				style={{ height: 390	, borderRadius: 20, padding: 20}}
				onDayPress={handleOnChangeDate} />
			</View>
			<View style={{ gap: 12 }}>
				<View>
					<Text style={[styles.header, { marginBottom: 10}]}>Daily Calorie Target {dailyCalorieTarget}</Text>
					<TextInput keyboardType='numeric'
						onChangeText={handleOnDailyCalorieTargetChange}
						value={dailyCalorieTarget.toString()}
						placeholder='Enter value'
						keyboardAppearance='dark'
						style={styles.inputField} />
				</View>
				<Button1 disabled={isFetching} style={[styles.button, { width: '100%'}]} title='Update Calories' onPress={() => handleUpdate()} />
			</View>
			<Toast />
		</View>
	)
}
