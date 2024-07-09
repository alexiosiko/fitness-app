import Text from '@/components/ui/text'
import { styles } from '@/constants/ui/styles'
import { useSettings } from '@/components/state/settings';
import React, { useState }  from 'react'
import { Button, Keyboard, SafeAreaView, TextInput, View } from 'react-native'
import Button1 from '@/components/ui/button1';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { SignedOut, useClerk, useUser } from '@clerk/clerk-expo';
import { colors } from '@/constants/ui/colors';
export default function Settings() {
	const [ dailyCalorieTarget, setDailyCalorieTarget] = useState<number>(2000);
	const [ isFetching, setIsFetching ] = useState<boolean>(false);
	const user = useUser();
	const { signOut } = useClerk();
    const { selectedDate, setSelectedDate } = useSettings();

	const handleOnDailyCalorieTargetChange = (value: string) => {
		const numericValue = value.replace(/[^0-9]/g, '');
   	 	setDailyCalorieTarget(Number(numericValue));
	}
	const handleUpdate = async () => {
		if (isFetching)
			return;
		try {
			setIsFetching(true);
			if (user?.user?.id == null) {
				console.error("User id null");
				return
			}
			const res = await axios.put(process.env.EXPO_PUBLIC_API_DOMAIN + "/users/update-calorie-target", {
				userId: user?.user?.id,
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
	const handleSignOut = async () => {
		try {
		  await signOut();
		  console.log('Successfully signed out');
		} catch (error) {
		  console.error('Error signing out:', error);
		}
	  };

	return (
		<SafeAreaView  style={[styles.background]} onTouchStart={() => Keyboard.dismiss()}>
			<View style={{ flexGrow: 1, justifyContent: 'center', gap: 24 }}>
				<Text style={[{ marginBottom: 10}]}>Daily Calorie Target {dailyCalorieTarget}</Text>
				<TextInput keyboardType='numeric'
					onChangeText={handleOnDailyCalorieTargetChange}
					value={dailyCalorieTarget.toString()}
					placeholder='Enter value'
					keyboardAppearance='dark'
					style={styles.inputField} />
				<Button1 disabled={isFetching} textStyle={{ color: colors.accentforeground}} style={[styles.buttonAccent, { width: '100%'}]} title='Update Calories Target' onPress={() => handleUpdate()} />
			</View>
			<Button1 style={[styles.buttonOutline, { marginBottom: 24 }]} textStyle={{ color: colors.foreground}} onPress={handleSignOut} title='Sign Out'/>
			<Toast />
		</SafeAreaView>
	)
}
