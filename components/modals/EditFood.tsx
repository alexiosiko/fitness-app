import React, { useEffect, useState } from 'react'
import { Keyboard, Modal, SafeAreaView, TextInput, View } from 'react-native'
import Button1 from '../ui/button1'
import { styles } from '@/constants/ui/styles'
import Text from '../ui/text'
import axios from 'axios'
import Toast from 'react-native-toast-message'
import { FontAwesome } from '@expo/vector-icons'
import { colors } from '@/constants/ui/colors'
import { Day, Food, UserDataType } from '@/constants/types/user'


export type ModalEditDateType = {
	index: number,
	isFood: boolean
}

export default function EditFood({ getUserData, setShowEditModal,  index, userData, selectedDayData }: {
	index: number,
	userData: UserDataType | undefined,
	getUserData: () => Promise<void>,
	selectedDayData: Day | undefined,
	setShowEditModal:  React.Dispatch<React.SetStateAction<boolean>>
}) {
	if (!selectedDayData)
		return;
	
	const [food, setFood] = useState<Food>(selectedDayData.foods[index])
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const handleDelete = async () => {
		if (isFetching)
			return;
		setIsFetching(false);
		try {
			const res = await axios.put(process.env.EXPO_PUBLIC_API_DOMAIN + '/users/foods/delete', {
				userId: userData?.userId,
				foodIndex: index,
				food: food,
				selectedDate: selectedDayData.date,

			});
			if (res.status != 200)
				throw Error(res.data.message)

			Toast.show({
				text1: "Deleted activity :D",
				text2: res.data.message,
			})

			// Re-fetch
			getUserData();

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
	const validateForm =  () => {
		if (food.name == "") 
			throw Error("Name cannot be empty")
		if (food.name == null)
			throw Error("Name cannot be null")
		if (userData?.userId == undefined) 
			throw Error("User Id is undefined");
		if (selectedDayData?.date == undefined) 
			throw Error("TodayData is undefined");
	}
	const handleUpdateActivity = async () => {
		if (isFetching)
			return;
		setIsFetching(true);
		
		try {
			validateForm();

			const res = await axios.put(process.env.EXPO_PUBLIC_API_DOMAIN + "/users/foods/update", {
				userId: userData!.userId,
				food: food,
				selectedDate: selectedDayData.date,
				foodIndex: index 
			})
			if (res.status != 200)
				throw Error("Couldn't update activity");

			// Re-fetch
			Toast.show({
				text1: "Updated activity :D",
			})
			getUserData()
			setShowEditModal(false)
		} catch (e: any) {
			Toast.show({
				type: 'error',
				text1: `Error`,
				text2: e.message,
			})
		} finally {
			setIsFetching(false);
		}
	}
	const handleCalorieChange = (str: string) => {
		let calories = Number(str);
		if (isNaN(calories))
			calories = 0;
		setFood({  ...food, calories: calories })
	}
	const handleProteinChange = (str: string) => {
		let protein = Number(str);
		if (isNaN(protein))
			protein = 0;
		setFood({  ...food, protein: protein })
	}
	useEffect(() => {
		setFood(selectedDayData.foods[index])
	}, [index])
  return (
	<Modal 	
		animationType="slide"
		style={{ backgroundColor: colors.background }}>
		<SafeAreaView onTouchStart={() => Keyboard.dismiss()} 
			style={{ height: "100%", width: '100%', backgroundColor: colors.background }}>
			<View style={{ margin: 10, gap: 20 }}>
				<View style={{ flexDirection: 'row', position: 'relative' }}>
					<Text style={[styles.header, { marginRight: 'auto', marginLeft: 'auto' }]}>Edit Food</Text>
					<FontAwesome disabled={isFetching} style={{ position: 'absolute', top: 0, right: 0}} name='trash' color="white" size={32} onPress={() => handleDelete()} />
				</View>
				<TextInput
					onChangeText={(value) => setFood({ ...food, name: value})}
					placeholderTextColor='lightgray'
					value={food.name}
					style={styles.inputField}
				/>
				<Text>Calories Gained</Text>
				<TextInput
				style={[styles.inputField]}
					placeholder="Enter Calories"
					keyboardType="numbers-and-punctuation"
					value={food.calories?.toString().replace('-', '')}
					onChangeText={(value) => handleCalorieChange(value)}
				/>
				<Text>Protein Eaten</Text>
				<TextInput
				style={styles.inputField}
					placeholder="Enter Calories"
					keyboardType="numbers-and-punctuation"
					value={food?.protein?.toString()}
					onChangeText={handleProteinChange}
				/>
				<View style={{ flexDirection: 'row', gap: 4, justifyContent: 'center'}}>
					<Button1 disabled={isFetching} style={[styles.buttonDestructive, { width: '45%'}]} title="Cancel" onPress={() => setShowEditModal(false)} />
					<Button1 disabled={isFetching} style={[styles.button, { width: '45%'}]} title="Update" onPress={() => handleUpdateActivity()}  />
				</View>
			</View>
		</SafeAreaView>
		<Toast />
	</Modal>
  )
}
