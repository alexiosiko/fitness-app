import { styles } from '@/constants/ui/styles'
import React, { useState } from 'react'
import { Modal, Dimensions, View, TextInput, Button, SafeAreaView, Keyboard } from 'react-native'
import Button1 from '../ui/button1'
import Text from '../ui/text'
import axios from 'axios'
import Toast from 'react-native-toast-message'
import { colors } from '@/constants/ui/colors'
import { Exercise, UserDataType } from '@/constants/types/user'
import { useSettings } from '../state/settings'

export type ModalDataType = {
	title: string,
	isFood: boolean
}

export default function InsertExercise({ setShowExerciseModal: setShowExercizeModal, getUserData, userData }: {
	userData: UserDataType,
	getUserData: () => Promise<void>
	setShowExerciseModal: React.Dispatch<React.SetStateAction<boolean>>,
}) {
	
	const [exercise, setExercize] = useState<Exercise>({
		calories: 0,
		name: '',
		timeInMinutes: 0
	})
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const { selectedDate } = useSettings();
	const handleTimeInMinutesChange = (str: string) => {
		let timeInMinutes = Number(str);
		if (isNaN(timeInMinutes))
			timeInMinutes = 0;
		setExercize({...exercise, timeInMinutes: timeInMinutes})
	}
	const handleCalorieChange = (str: string) => {
		let calories = Number(str);
		if (isNaN(calories))
			calories = 0;
		setExercize({...exercise, calories: calories})
	}
	const validateForm = () => {
		if (userData == undefined) 
			throw Error("Could not get user data")
		if (!exercise)
			throw Error("Food data is empty");
		if (exercise.name == "")
			throw Error("Food name is empty")
		if (exercise.calories == 0) 
			throw Error("Calories cannot be 0")
		if (exercise.timeInMinutes == 0) 
			throw Error("timeInMinutes cannot be 0")
		if (selectedDate == undefined)
			console.error("Selected date is undefined");
	}
	const handleInsertActivity = async () => {
		if (isFetching)
			return;
		setIsFetching(true);
		try {
			validateForm()

			const res = await axios.put(process.env.EXPO_PUBLIC_API_DOMAIN + "/users/exercises/insert", {
				userId: userData!.userId,
				exercise: exercise,
				selectedDate: selectedDate
			})
			if (res.status != 200) 
				throw Error(res.data.message)
			Toast.show({
				text1: "Successfully added activity"
			})
			getUserData();
			setShowExercizeModal(false)
		} catch (e: any) {
			Toast.show({
				type: 'error',
				text1: e.message
			})
		} finally {
			setIsFetching(false);
		}
	}
	  return (
	<Modal
		presentationStyle='pageSheet'
		animationType="slide"
		>
		<SafeAreaView
		onTouchStart={() => Keyboard.dismiss()}
		 style={{ height: "100%", width: '100%', backgroundColor: colors.background }}>
			<View style={{ margin: 10, gap: 20 }}>
				<Text style={[styles.header, { marginBottom: '10%' }]}>Add New Excersize</Text>
				<Text>Exercise Name</Text>
				<TextInput
					onChangeText={name => setExercize({ ...exercise, name: name })}
					value={exercise.name}
					style={styles.inputField}
					placeholderTextColor='lightgray'
					placeholder={`Excersize name`}
				/>
				<Text>Calories Burned</Text>
				<TextInput
				style={styles.inputField}
					placeholder="Enter Calories"
					keyboardType="numbers-and-punctuation"
					value={exercise.calories.toString()}
					onChangeText={handleCalorieChange}
				/>
				<Text>Time (In Minutes)</Text>
				<TextInput
				style={styles.inputField}
					placeholder="Enter minutes"
					keyboardType="numbers-and-punctuation"
					value={exercise.timeInMinutes.toString()}
					onChangeText={handleTimeInMinutesChange}
				/>
				<View style={{ flexDirection: 'row', gap: 4, justifyContent: 'center'}}>
					<Button1 disabled={isFetching} style={[styles.buttonDestructive, { width: '45%'}]} title="Cancel" onPress={() => setShowExercizeModal(false)} />
					<Button1 disabled={isFetching} style={[styles.button, { width: '45%'}]} title="Add" onPress={() => handleInsertActivity()}  />
				</View>
			</View>
		</SafeAreaView>
		<Toast />
	</Modal>
  )
}
