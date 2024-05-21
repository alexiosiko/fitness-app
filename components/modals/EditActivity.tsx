import { ModalEditDateType } from '@/app/(auth)/home'
import { Day, UserDataType, Activity } from '@/constants/types/user'
import React, { useEffect, useState } from 'react'
import { Keyboard, Modal, SafeAreaView, TextInput, View } from 'react-native'
import Button1 from '../ui/button1'
import { styles } from '@/constants/ui/styles'
import Text from '../ui/text'
import axios from 'axios'

export default function EditActivity({ todayData, modalData, setModalData, userData }: {
	modalData: ModalEditDateType,
	todayData: Day | undefined,
	userData: UserDataType | undefined,
	setModalData: React.Dispatch<React.SetStateAction<ModalEditDateType>>
}) {
	const [calories, setCalories] = useState<number | null>(null);
	const [name, setName] = useState<string>("");
	const handleOnDailyCalorieTargetChange = (value: string) => {
		const numericValue = value.replace(/[^0-9]/g, '');
		setCalories(Number(numericValue));
	}
	const handleUpdateActivity = async () => {
		if (name == "") {
			console.error("Name cannot be empty")
			return;
		}
		if (calories == null) {
			console.error("Name cannot be null")
			return;
		}
		const newActivity: Activity = {
			calories: calories,
			name: name
		}
		try {
			if (userData?.userId == undefined) {
				console.error("User Id is undefined");
				return;
			}
			if (todayData?.date == undefined) {
				console.error("TodayData is undefined");
				return;
			}
			const res = await axios.put(process.env.EXPO_PUBLIC_API_DOMAIN + "/users/activities/update", {
				userId: userData.userId,
				activity: newActivity,
				date: todayData.date,
				index: modalData.index
			})
			if (res.status == 200) {
				// Deep copy
				// Update locally
				todayData.activities[modalData.index] = {...newActivity}
			} else {
				console.log("res status isnt 200")
			}
		} catch (e: any) {
			console.error(e.message);
		}
	}
	useEffect(() => {
		setCalories(todayData?.activities[modalData.index]?.calories || -1);
		setName(todayData?.activities[modalData.index]?.name || "");
	}, [modalData])
	
  return (
	<Modal 	
		animationType="slide"
		visible={modalData.visible}>
		<SafeAreaView onTouchStart={() => Keyboard.dismiss()} style={{ margin: 10, justifyContent: 'flex-start', gap: 20,height: "100%" }}>
				<Text style={styles.header}>Edit Activity</Text>
				<TextInput
					onChangeText={setName}
					value={name}
					style={styles.inputField}
				/>
				<TextInput
				style={styles.inputField}
					placeholder="Enter Calories"
					keyboardType="numeric"
					value={calories?.toString()}
					onChangeText={handleOnDailyCalorieTargetChange}
				/>
			<View style={{ flexDirection: 'row', gap: 4, justifyContent: 'center'}}>
				<Button1 style={[styles.button, { width: '45%'}]} title="Update" onPress={() => handleUpdateActivity()}  />
				<Button1 style={[styles.buttonDestructive, { width: '45%'}]} title="Cancel" onPress={() => setModalData({ index: -1, visible: false})} />
			</View>
		</SafeAreaView>
	</Modal>
  )
}
