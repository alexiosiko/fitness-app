import { Day, UserDataType, Activity } from '@/constants/types/user'
import React, { useEffect, useState } from 'react'
import { Keyboard, Modal, SafeAreaView, TextInput, View } from 'react-native'
import Button1 from '../ui/button1'
import { styles } from '@/constants/ui/styles'
import Text from '../ui/text'
import axios from 'axios'
import Toast from 'react-native-toast-message'
import { FontAwesome } from '@expo/vector-icons'


export type ModalEditDateType = {
	index: number
}

export default function EditActivity({ getUserData, modalData, setModalData, userData, selectedDayData }: {
	modalData: ModalEditDateType | undefined,
	userData: UserDataType | undefined,
	setModalData: React.Dispatch<React.SetStateAction<ModalEditDateType | undefined>>,
	getUserData: () => Promise<void>,
	selectedDayData: Day | undefined
}) {
	if (!modalData || !selectedDayData)
		return;
	const [activity, setActivity] = useState<Activity>(selectedDayData.activities[modalData.index])
	const handleDelete = async () => {
		try {
			const res = await axios.post(process.env.EXPO_PUBLIC_API_DOMAIN + '/users/activities/delete', {
				userId: userData?.userId,
				activity: activity,
				selectedDate: selectedDayData.date,

			});
			if (res.status != 200)
				throw Error(res.data.message)

			Toast.show({
				text1: "Updated activity :D",
				text2: res.data.message,
			})

			// Re-fetch
			getUserData();

			setModalData(undefined)
		} catch (e: any) {
			Toast.show({
				type: "error",
				text1: "Error :(",
				text2: e.message,
			})
		}
	}
	const handleUpdateActivity = async () => {
		if (activity.name == "") {
			console.error("Name cannot be empty")
			return;
		}
		if (activity.name == null) {
			console.error("Name cannot be null")
			return;
		}
		try {
			if (userData?.userId == undefined) {
				console.error("User Id is undefined");
				return;
			}
			if (selectedDayData?.date == undefined) {
				console.error("TodayData is undefined");
				return;
			}
			const res = await axios.put(process.env.EXPO_PUBLIC_API_DOMAIN + "/users/activities/update", {
				userId: userData.userId,
				activity: activity,
				selectedDate: selectedDayData.date,
				activityIndex: modalData.index 
			})
			if (res.status != 200)
				throw Error("Couldn't update activity");

			// Re-fetch
			getUserData()
			Toast.show({
				text1: "Updated activity :D",
			})
			setModalData(undefined)
		} catch (e: any) {
			Toast.show({
				type: 'error',
				text1: `Error`,
				text2: e.message,
			})
		}
	}
	const handleOnChangeCalories = (str: string) => {
		let calories = Number(str);
		if (isNaN(calories))
			calories = 0;
		setActivity({ name:  activity.name, calories: calories })
	}
	useEffect(() => {
		setActivity({
			calories: selectedDayData?.activities[modalData.index]?.calories || -1,
			name: selectedDayData?.activities[modalData.index]?.name || ""
		})
	}, [modalData])
  return (
	<Modal 	
		animationType="slide"
		visible={modalData != undefined}>
		<SafeAreaView onTouchStart={() => Keyboard.dismiss()} style={{ margin: 10, justifyContent: 'flex-start', gap: 20,height: "100%" }}>
			<View style={{ flexDirection: 'row', position: 'relative' }}>
				<Text style={[styles.header, { marginRight: 'auto', marginLeft: 'auto' }]}>Edit Activity</Text>
				<FontAwesome style={{ position: 'absolute', top: 0, right: 0}} name='trash' size={32} onPress={() => handleDelete()} />
			</View>
			<TextInput
				onChangeText={(value) => setActivity({ name:  value, calories: activity.calories})}
				value={activity.name}
				style={styles.inputField}
			/>
			<TextInput
			style={[styles.inputField]}
				placeholder="Enter Calories"
				keyboardType="numbers-and-punctuation"
				value={activity.calories?.toString()}
				onChangeText={(value) => handleOnChangeCalories(value)}
			/>
			<View style={{ flexDirection: 'row', gap: 4, justifyContent: 'center'}}>
				<Button1 style={[styles.buttonDestructive, { width: '45%'}]} title="Cancel" onPress={() => setModalData(undefined)} />
				<Button1 style={[styles.button, { width: '45%'}]} title="Update" onPress={() => handleUpdateActivity()}  />
			</View>
		</SafeAreaView>
		<Toast />
	</Modal>
  )
}
