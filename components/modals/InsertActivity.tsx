import { styles } from '@/constants/ui/styles'
import React, { useState } from 'react'
import { Modal, Dimensions, View, TextInput, Button, SafeAreaView, Keyboard } from 'react-native'
import Button1 from '../ui/button1'
import Text from '../ui/text'
import axios from 'axios'
import { UserDataType, Activity as Activity, Day } from '@/constants/types/user'
import Toast from 'react-native-toast-message'

export type ModalDataType = {
	visible: boolean,
	title: string,
}

export default function InsertActivity({ modalData, setModalData, userData, setTodayData, todayData }: {
	modalData: ModalDataType,
	setModalData: React.Dispatch<React.SetStateAction<ModalDataType>>,
	userData: UserDataType | undefined,
	setTodayData:  React.Dispatch<React.SetStateAction<Day | undefined>>,
	todayData: Day | undefined
}) {
	const [calories, setCalories] = useState<number | null>(null);
	const [name, setName] = useState<string>("");
	const [fetching, setFetching] = useState<boolean>(false);
	const handleOnDailyCalorieTargetChange = (value: string) => {
		const numericValue = value.replace(/[^0-9]/g, '');
		setCalories(Number(numericValue));
	}
	const valideActivityData = (): boolean => {
		if (userData == undefined) {
			Toast.show({
				type: 'error',
				text1: "Could not get user data",
				text2: "Try sign out and sign again, or contact support"
			})
			return false;
		}
		if (name == ""){ 
			Toast.show({
				type: 'error',
				text1: "Enter a name",
				text2: "Try sign out and sign again, or contact support"
			})
			return false;
		}
		if (calories == null) {
			console.error("Enter calories");
			return false;
		}
		return true;
	}
	const handleAddActivity = async () => {
		setFetching(true);
		try {
			if (!valideActivityData())
				return

			const activity: Activity = {
				calories: modalData.title == "Food" ?  calories! : -calories!,
				name: name
			}
			console.log(activity);
			const res = await axios.put(process.env.EXPO_PUBLIC_API_DOMAIN + "/users/activities/", {
				userId: userData!.userId,
				activity: activity
			})

			if (res.status != 200) {
				console.error("Couldn't insert activity");
				return;
			}
			// Set locally
			if (todayData == null) {
				setTodayData({
					activities: [activity],
					date: new Date(),
				})
			} else {
				todayData.activities.push(activity)
				setTodayData({ // Manually rerender
					...todayData,
				})
			}
			setModalData({ title: "", visible: false })
		
		} catch (e: any) {
			console.error(e.message);
		} finally {
			setFetching(false);
		}
	}
	  return (
	<Modal
		style={{ height: 200, zIndex: -5 }}
		animationType="slide"
		visible={modalData.visible}
	>
		<SafeAreaView
		onTouchStart={() => Keyboard.dismiss()}
		 style={{ margin: 10, marginTop: '3%', gap: 20,height: "100%" }}>
			<Text style={styles.header}>Add New {modalData.title}</Text>
			<TextInput
				onChangeText={setName}
				value={name}
				style={styles.inputField}
				placeholder={`${modalData.title} Name`}
			/>
			<TextInput
			style={styles.inputField}
				placeholder="Enter Calories"
				keyboardType="numeric"
				value={calories?.toString()}
				onChangeText={handleOnDailyCalorieTargetChange}
			/>
			<View style={{ flexDirection: 'row', gap: 4, justifyContent: 'center'}}>
				<Button1 style={[styles.button, { width: '45%'}]} title="Add" onPress={() => handleAddActivity()}  />
				<Button1 style={[styles.buttonDestructive, { width: '45%'}]} title="Cancel" onPress={() => setModalData({...modalData, visible: false})} />
			</View>
		</SafeAreaView>
	</Modal>
  )
}
