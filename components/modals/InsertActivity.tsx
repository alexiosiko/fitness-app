import { styles } from '@/constants/ui/styles'
import React, { useState } from 'react'
import { Modal, Dimensions, View, TextInput, Button, SafeAreaView, Keyboard } from 'react-native'
import Button1 from '../ui/button1'
import Text from '../ui/text'
import axios from 'axios'
import { UserDataType, Activity as Activity, Day } from '@/constants/types/user'
import Toast from 'react-native-toast-message'
import { colors } from '@/constants/ui/colors'

export type ModalDataType = {
	title: string,
	isFood: boolean
}

export default function InsertActivity({ insertActivityModalData, userData, getUserData, selectedDate: selectedDate, setInsertActivityModalData: setModalData }: {
	insertActivityModalData: ModalDataType | undefined,
	userData: UserDataType | undefined
	getUserData: () => Promise<void>,
	selectedDate: Date | undefined,
	setInsertActivityModalData: React.Dispatch<React.SetStateAction<ModalDataType | undefined>>
}) {
	if (!insertActivityModalData)
		return;
	
	const [activity, setActivity] = useState<Activity>({ calories: 0, name: '' })
	const [fetching, setFetching] = useState<boolean>(false);

	const handleOnDailyCalorieTargetChange = (str: string) => {
		let calories = Number(str);
		if (isNaN(calories))
			calories = 0;
		setActivity({ name: activity.name, calories: calories });
}
	const validateForm = () => {
		if (userData == undefined) 
			throw Error("Could not get user data")
		if (activity.name == "")
			throw Error("Activity name is empty")
		if (activity.calories == 0) 
			throw Error("Calories cannot be 0")
		if (selectedDate == undefined)
			console.error("Selected date is undefined");
	}
	const handleInsertActivity = async () => {
		setFetching(true);
		try {
			validateForm()

			if (!insertActivityModalData.isFood)
				activity.calories *= -1;

			const res = await axios.put(process.env.EXPO_PUBLIC_API_DOMAIN + "/users/activities", {
				userId: userData!.userId,
				activity: activity,
				selectedDate: selectedDate
			})
			if (res.status != 200) 
				throw Error(res.data.message)
			Toast.show({
				text1: "Successfully added activity"
			})
			getUserData();
			setModalData(undefined)
		} catch (e: any) {
			Toast.show({
				type: 'error',
				text1: e.message
			})
		} finally {
			setFetching(false);
		}
	}
	  return (
	<Modal
		presentationStyle='pageSheet'
		animationType="slide"
		visible={insertActivityModalData != undefined}
		>
		<SafeAreaView
		onTouchStart={() => Keyboard.dismiss()}
		 style={{ height: "100%", width: '100%', backgroundColor: colors.background }}>
			<View style={{ margin: 10, gap: 20 }}>
				<Text style={[styles.header, { marginBottom: '10%' }]}>Add New Activity</Text>
				<Text>{insertActivityModalData.isFood ? "Food Name" : "Exercise Name"}</Text>
				<TextInput
					onChangeText={name => setActivity({ name: name, calories: activity.calories })}
					value={activity.name}
					style={styles.inputField}
					placeholderTextColor='lightgray'
					placeholder={`${insertActivityModalData.title} Name`}
				/>
				<Text>{insertActivityModalData.isFood ? "Calories Gained" : "Calories Burned"}</Text>
				<TextInput
				style={styles.inputField}
					placeholder="Enter Calories"
					keyboardType="numbers-and-punctuation"
					value={activity.calories?.toString().replace('-', '')}
					onChangeText={handleOnDailyCalorieTargetChange}
				/>
				<View style={{ flexDirection: 'row', gap: 4, justifyContent: 'center'}}>
					<Button1 style={[styles.buttonDestructive, { width: '45%'}]} title="Cancel" onPress={() => setModalData(undefined)} />
					<Button1 style={[styles.button, { width: '45%'}]} title="Add" onPress={() => handleInsertActivity()}  />
				</View>
			</View>
		</SafeAreaView>
		<Toast />
	</Modal>
  )
}
