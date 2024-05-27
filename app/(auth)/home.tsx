import ActivityComponent from '@/components/activity';
import useUserData from '@/components/hooks/useUserData';
import EditActivity, { ModalEditDateType } from '@/components/modals/EditActivity';
import InsertActivity, { ModalDataType } from '@/components/modals/InsertActivity';
import { useSettings } from '@/components/state/settings';
import Button1 from '@/components/ui/button1';
import Text from '@/components/ui/text'
import { colors } from '@/constants/ui/colors';
import { styles } from '@/constants/ui/styles'
import React, { useState } from 'react'
import { ActivityIndicator, SafeAreaView, ScrollView, View } from 'react-native'
import Toast from 'react-native-toast-message';
import { Circle } from 'react-native-progress';
export default function Home() {
	const { userData, getEatenCalories, getBurnedCalories, selectedDayData, getRemainingCalories, getUserData } = useUserData();
	const [ insertActivityModalData, setInsertActivityModalData] = useState<ModalDataType | undefined>(undefined);
	const [ editActivityModalData, setEditActivityModalData] = useState<ModalEditDateType | undefined>(undefined);
	const { selectedDate } = useSettings();

	const getCaloriesProgress = (): number => {
		if (selectedDayData == undefined)
			return 0;
		const numerator = getRemainingCalories(selectedDayData)
		const denomerator = userData?.dailyCalorieTarget;
		
		if (!numerator || !denomerator)
			return 0;

		return numerator / denomerator;
	}

	return (
		<SafeAreaView style={[{ backgroundColor: colors.background}, { height: '100%' }]}>
			<View style={{alignItems: 'center', gap: 24, margin: 10, height: '100%'}}>
				{/* <Text style={{ marginTop: 24 }}>Daily Calorie Target: {userData ? userData?.dailyCalorieTarget : <ActivityIndicator /> }</Text> */}
				<Text>{selectedDate ? selectedDate.toDateString() : <ActivityIndicator /> }</Text>
				<View style={{ flexDirection: 'row', width: '100%', borderRadius: 20, padding: 10, gap: 40, justifyContent: 'space-evenly', backgroundColor: colors.primary, height: 170, alignItems: 'center' }}>
					<View>
						<Text light style={styles.header}>{selectedDayData ? getEatenCalories(selectedDayData) : <ActivityIndicator />}</Text>
						<Text light>Eaten</Text>
					</View>
					<View >
						<Text light style={styles.header}>{selectedDayData ? getRemainingCalories(selectedDayData) : <ActivityIndicator />}</Text>
						<Text light >Remaining</Text>
						<Circle style={{ position: 'absolute', right: -24, bottom: -42}} unfilledColor={colors.unfilledcolor} color={colors.background} progress={getCaloriesProgress()} size={145} borderWidth={0} />
					</View>
					<View>
						<Text light style={styles.header}>{selectedDayData ? getBurnedCalories(selectedDayData) : <ActivityIndicator />}</Text>
						<Text light>Burned</Text>
					</View>
				</View>
				<Text>Todays Summary</Text>
				<ScrollView style={{ overflow: 'scroll', flexGrow: 1, margin: 4}}>
					{selectedDayData?.activities.map((activity, index) => 
						<ActivityComponent setEditActivityModalData={setEditActivityModalData} index={index} key={index} activity={activity}/>
					)}
				</ScrollView>
				<View style={{ flexDirection: 'row', gap: 4, marginBottom: 24 }}>
					<Button1 style={[styles.button, { width: '40%'}]} title='Add Excersize' onPress={() => setInsertActivityModalData({title: 'Excersize', isFood: false })} />
					<Button1 style={[styles.buttonDestructive, { width: '40%'}]} title='Add Food' onPress={() => setInsertActivityModalData({title: 'Food', isFood: true })} />
				</View>
				<InsertActivity getUserData={getUserData} insertActivityModalData={insertActivityModalData} selectedDate={selectedDate} setInsertActivityModalData={setInsertActivityModalData} userData={userData} />
				<EditActivity getUserData={getUserData} modalData={editActivityModalData} selectedDayData={selectedDayData} setModalData={setEditActivityModalData} userData={userData} />
			</View>
			<Toast />
		</SafeAreaView>
	)
}

