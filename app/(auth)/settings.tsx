import Text from '@/components/ui/text'
import { styles } from '@/constants/ui/styles'
import { useSettings } from '@/components/state/settings';
import React, { useState }  from 'react'
import { Keyboard, TextInput, View } from 'react-native'
import Button1 from '@/components/ui/button1';
import axios from 'axios';
import { useUser } from '@clerk/clerk-expo';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '@/constants/ui/colors';
import Toast from 'react-native-toast-message';


export default function Settings() {
	const { selectedDate, setSelectedDate } = useSettings() as any;
	const [ dailyCalorieTarget, setDailyCalorieTarget] = useState<number>(1);
	const [ showCalendar, setShowCalendar] = useState<boolean>(false);
	const { user } = useUser();
	const handleOnDailyCalorieTargetChange = (value: string) => {
		const numericValue = value.replace(/[^0-9]/g, '');
   	 	setDailyCalorieTarget(Number(numericValue));
	}
	const handleUpdate = async () => {
		if (user?.id == null) {
			console.error("User id null");
			return
		}
		try {
			const res = await axios.put(process.env.EXPO_PUBLIC_API_DOMAIN + "/users/update-calorie-target", {
				userId: user.id,
				dailyCalorieTarget: dailyCalorieTarget
			})
			if (res.status == 200)
				Toast.show({
					type: 'error',
					text1: "Successfully update calorie target :D",
				})
			else
				throw Error(res.data.message);
		} catch (e: any) {
			Toast.show({
				type: 'error',
				text1: "Could not update calories target",
				text2: e.message
			})
		}
	}
	const handleOnChangeDate = (e: any, date: Date | undefined) => {
		if (date)
			setSelectedDate(date);
	}
	return (
		<View onTouchStart={() => Keyboard.dismiss()} style={{ height: '100%', justifyContent: 'space-around', gap: 12, margin: 10}}>
			<View style={{ gap: 12}}>
				<Button1  title='Change Datesadsa' onPress={() => setShowCalendar(true)}/>
				{showCalendar && <RNDateTimePicker
					themeVariant='light'
					mode='date'
					textColor='red'
					accentColor={colors.primary}
					
					onChange={handleOnChangeDate}
					value={selectedDate!} /> }
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
				<Button1 style={[styles.button, { width: '100%'}]} title='Update Calories' onPress={() => handleUpdate()} />
			</View>
			<Toast />
		</View>
	)
}
