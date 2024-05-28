import React, { useEffect, useState } from 'react'
import { Keyboard, Modal, SafeAreaView, TextInput, View } from 'react-native'
import Button1 from '../ui/button1'
import { styles } from '@/constants/ui/styles'
import Text from '../ui/text'
import axios from 'axios'
import Toast from 'react-native-toast-message'
import { FontAwesome } from '@expo/vector-icons'
import { colors } from '@/constants/ui/colors'
import { Day, Exercise, Food, UserDataType } from '@/constants/types/user'
import { useSettings } from '../state/settings'


export type ModalEditDateType = {
	index: number,
	isFood: boolean
}

export default function EditExercise({ getUserData, setShowEditModal,  index, userData, selectedDayData }: {
	index: number,
	userData: UserDataType | undefined,
	getUserData: () => Promise<void>,
	selectedDayData: Day | undefined,
	setShowEditModal:  React.Dispatch<React.SetStateAction<boolean>>
}) {
	if (!selectedDayData)
		return;
	
	const [exercise, setExercise] = useState<Exercise>(selectedDayData.exercises[index])
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const { selectedDate } = useSettings();


	const handleDelete = async () => {
		if (isFetching)
			return;
		setIsFetching(false);
		try {
			const res = await axios.put(process.env.EXPO_PUBLIC_API_DOMAIN + '/users/exercises/delete', {
				userId: userData?.userId,
				exercise: exercise,
				selectedDate: selectedDayData.date,

			});
			if (res.status != 200)
				throw Error(res.data.message)


			// Re-fetch
			getUserData();
			setShowEditModal(false);

			
			Toast.show({
				text1: "Deleted activity :D",
				text2: res.data.message,
			})

		} catch (e: any) {
			Toast.show({
				type: "error",
				text1: "Error :(",
				text2: e.message,
			})
		} finally {
			setIsFetching(false);
		}
	}
	const handleTimeInMinutesChange = (str: string) => {
		let timeInMinutes = Number(str);
		if (isNaN(timeInMinutes))
			timeInMinutes = 0;
		setExercise({...exercise, timeInMinutes: timeInMinutes})
	}
	const handleCalorieChange = (str: string) => {
		let calories = Number(str);
		if (isNaN(calories))
			calories = 0;
		setExercise({...exercise, calories: calories})
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
	const handleUpdateExercise = async () => {
		if (isFetching)
			return;
		setIsFetching(true);
		try {
			validateForm()

			const res = await axios.put(process.env.EXPO_PUBLIC_API_DOMAIN + "/users/exercises/update", {
				userId: userData!.userId,
				exercise: exercise,
				exerciseIndex: index,
				selectedDate: selectedDate
			})
			if (res.status != 200) 
				throw Error(res.data.message)
			Toast.show({
				text1: "Successfully added activity"
			})
			getUserData();
			setShowEditModal(false)
		} catch (e: any) {
			Toast.show({
				type: 'error',
				text1: e.message
			})
		} finally {
			setIsFetching(false);
		}
	}
	useEffect(() => {
		setExercise(selectedDayData.exercises[index])
	}, [index])
  return (
	<Modal
		presentationStyle='pageSheet'
		animationType="slide"
		>
		<SafeAreaView
		onTouchStart={() => Keyboard.dismiss()}
		 style={{ height: "100%", width: '100%', backgroundColor: colors.background }}>
			<View style={{ margin: 10, gap: 20 }}>
				<View style={{ flexDirection: 'row', position: 'relative' }}>
					<Text style={[styles.header, { marginRight: 'auto', marginLeft: 'auto' }]}>Edit Exercise</Text>
					<FontAwesome disabled={isFetching} style={{ position: 'absolute', top: 0, right: 0}} name='trash' size={32} onPress={() => handleDelete()} />
				</View>
				<TextInput
					onChangeText={name => setExercise({ ...exercise, name: name })}
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
					<Button1 disabled={isFetching} style={[styles.buttonDestructive, { width: '45%'}]} title="Cancel" onPress={() => setShowEditModal(false)} />
					<Button1 disabled={isFetching} style={[styles.button, { width: '45%'}]} title="Update" onPress={() => handleUpdateExercise()}  />
				</View>
			</View>
		</SafeAreaView>
		<Toast />
	</Modal>
  )
}
