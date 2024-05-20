import Text from '@/components/ui/text'
import { styles } from '@/constants/ui/styles'
import { useSettings } from '@/components/state/settings';
import React, { useState }  from 'react'
import { Dimensions, TextInput, View } from 'react-native'
import Button1 from '@/components/ui/button1';
import axios from 'axios';
import { useUser } from '@clerk/clerk-expo';

export default function Settings() {

	const [ dailyCalorieTarget, setDailyCalorieTarget] = useState<number>(1);
	const { user } = useUser();
	const handleOnDailyCalorieTargetChange = (value: string) => {
		const numericValue = value.replace(/[^0-9]/g, '');
   	 	setDailyCalorieTarget(Number(numericValue));
	}
	const handleUpdate = async () => {
		if (user?.id == null){
			console.error("User id null");
			return
		}
		try {
			const res = await axios.put(process.env.EXPO_PUBLIC_API_DOMAIN + "/users/update", {
				userId: user.id,
				params: {
					dailyCalorieTarget: dailyCalorieTarget
				}
			})
		} catch (e: any) {
			console.error(e.message);
		}
	}
	return (
		<View>
			<View>
				<Text style={[styles.header,]}>Daily Calorie Target {dailyCalorieTarget}</Text>
				<TextInput keyboardType='numeric'
				onChangeText={handleOnDailyCalorieTargetChange}
				value={dailyCalorieTarget.toString()}
				placeholder='Enter value'
				style={{ flexGrow: 1, borderWidth: 1, margin: 12, textAlign: 'center' }} />
			</View>
			<Button1 title='Update' onPress={() => handleUpdate()} />
		</View>
	)
}
