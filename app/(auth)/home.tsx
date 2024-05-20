import useUserData from '@/components/hooks/useUserData';
import InsertActivity, { ModalDataType } from '@/components/modals/InsertActivity';
import Button1 from '@/components/ui/button1';
import Text from '@/components/ui/text'
import { colors } from '@/constants/ui/colors';
import { styles } from '@/constants/ui/styles'
import React, { useEffect, useState }  from 'react'
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native'


type modalEditDateType = {
	visible: boolean,
	index: number
}

export default function Home() {
	const { userData, isFetching, todayData, setTodayData, getEatenCalories, getBurnedCalories, getRemainingCalories } = useUserData();
	const [modalActivityData, setActivityModalData] = useState<ModalDataType>({
		title: '',
		visible: false,
	});
	const [modalEditData, setEditModalData] = useState<modalEditDateType>({
		visible: false,
		index: -1
	});

	const handleOnModal = (name: string) => {
		setActivityModalData({
			visible: true,
			title: name,
		})
	}
	const handleEditActivity = () => {

	}

	return (
		<View style={{ alignItems: 'center', gap: 24, margin: 4}}>
			<Text>Target: {userData ? userData?.dailyCalorieTarget : <ActivityIndicator /> }</Text>
			<Text>{todayData?.date ? todayData.date.toDateString() : <ActivityIndicator /> }</Text>
			<View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', height: 150, alignItems: 'center' }}>
				<View>
					<Text style={styles.header}>{todayData ? getEatenCalories(): <ActivityIndicator />}</Text>
					<Text>Eaten</Text>
				</View>
				<View>
					<Text style={styles.header}>{todayData ? getRemainingCalories(): <ActivityIndicator />}</Text>
					<Text>Remaining</Text>
				</View>
				<View>
					<Text style={styles.header}>{todayData ? getBurnedCalories(): <ActivityIndicator />}</Text>
					<Text>Burned</Text>
				</View>
			</View>

			<ScrollView style={{ overflow: 'scroll', height: 300, marginLeft: 12, marginRight: 12 }}>
				{todayData?.activities.map((activity, index) => 
					<Pressable key={index} onPress={() => handleEditActivity()} 
					style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%", 
						height: 40,
						margin: 4,
						alignItems: 'center',
						paddingLeft: 12,
						paddingRight: 24,
						backgroundColor: colors.background
					}}>
						<Text>{activity.name}</Text>
						<Text>{activity.calories}</Text>
					</Pressable>
				)}
			</ScrollView>
			<View style={{ flexDirection: 'row', gap: 4}}>
				<Button1 style={[styles.button, { width: '40%'}]} title='Add Food' onPress={() => handleOnModal('Food')} />
				<Button1 style={[styles.buttonDestructive, { width: '40%'}]} title='Add Excersize' onPress={() => handleOnModal('Exercise')} />
			</View>
			<InsertActivity todayData={todayData} modalData={modalActivityData} setTodayData={setTodayData} setModalData={setActivityModalData} userData={userData} />
		</View>
	)
}

