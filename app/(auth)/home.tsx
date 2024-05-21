import useUserData from '@/components/hooks/useUserData';
import EditActivity from '@/components/modals/EditActivity';
import InsertActivity, { ModalDataType } from '@/components/modals/InsertActivity';
import Button1 from '@/components/ui/button1';
import Text from '@/components/ui/text'
import { colors } from '@/constants/ui/colors';
import { styles } from '@/constants/ui/styles'
import React, { useState }  from 'react'
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native'
import Toast from 'react-native-toast-message';

export type ModalEditDateType = {
	visible: boolean,
	index: number
}

export default function Home() {
	const { userData, isFetching, todayData, setTodayData, getEatenCalories, getBurnedCalories, getRemainingCalories } = useUserData();
	const [modalActivityData, setActivityModalData] = useState<ModalDataType>({
		title: '',
		visible: false,
	});
	const [modalEditData, setEditModalData] = useState<ModalEditDateType>({
		visible: false,
		index: -1
	});

	const handleOnModal = (name: string) => {
		setActivityModalData({
			visible: true,
			title: name,
		})
	}
	const handleEditActivity = (index: number) => {
		setEditModalData({
			visible: true,
			index: index
		})
	}


	return (
		<View style={{ alignItems: 'center', gap: 24, margin: 10}}>
			<Text>Daily Calorie Target: {userData ? userData?.dailyCalorieTarget : <ActivityIndicator /> }</Text>
			<Text>{todayData?.date ? todayData.date.toDateString() : <ActivityIndicator /> }</Text>
			<View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', height: 150, alignItems: 'center' }}>
				<View>
					<Text style={styles.header}>{todayData ? getEatenCalories(): <ActivityIndicator />}</Text>
					<Text style={{ color: colors.secondary }}>Eaten</Text>
				</View>
				<View>
					<Text style={styles.header}>{todayData ? getRemainingCalories(): <ActivityIndicator />}</Text>
					<Text style={{ color: colors.secondary }}>Remaining</Text>
				</View>
				<View>
					<Text style={styles.header}>{todayData ? getBurnedCalories(): <ActivityIndicator />}</Text>
					<Text style={{ color: colors.secondary }}>Burned</Text>
				</View>
			</View>

			<ScrollView style={{ overflow: 'scroll', height: 250 }}>
				{todayData?.activities.map((activity, index) => 
					<Pressable key={index} onPress={() => handleEditActivity(index)} 
					style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%", 
						height: 40,
						margin: 4,
						alignItems: 'center',
						paddingLeft: 12,
						paddingRight: 24,
						backgroundColor: colors.background
					}}>
						<Text>{activity.name}</Text>
						<Text style={{ color: activity.calories > 0 ? colors.destructive : colors.primary }}>{Math.abs(activity.calories)}</Text>
					</Pressable>
				)}
			</ScrollView>
			<View style={{ flexDirection: 'row', gap: 4 }}>
				<Button1 style={[styles.button, { width: '40%'}]} title='Add Excersize' onPress={() => handleOnModal('Exercise')} />
				<Button1 style={[styles.buttonDestructive, { width: '40%'}]} title='Add Food' onPress={() => handleOnModal('Food')} />
			</View>
			<InsertActivity todayData={todayData} modalData={modalActivityData} setTodayData={setTodayData} setModalData={setActivityModalData} userData={userData} />
			<EditActivity userData={userData} todayData={todayData} modalData={modalEditData} setModalData={setEditModalData} />
			<Toast />
				
		</View>
	)
}

