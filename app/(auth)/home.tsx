import ActivityComponent from '@/components/activity';
import useModal from '@/components/hooks/useModal';
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
import * as Progress from 'react-native-progress';


export default function Home() {
	const { userData, getEatenCalories, getBurnedCalories, selectedDayData, getRemainingCalories, getUserData } = useUserData();
	const [ insertActivityModalData, setInsertActivityModalData] = useState<ModalDataType | undefined>(undefined);
	const [ editActivityModalData, setEditActivityModalData] = useState<ModalEditDateType | undefined>(undefined);
	const { selectedDate, setSelectedDate } = useSettings() as any;
	return (
		<SafeAreaView style={{ alignItems: 'center', gap: 24, margin: 10, height: '100%'}}>
			<Text>Daily Calorie Target: {userData ? userData?.dailyCalorieTarget : <ActivityIndicator /> }</Text>
			<Text>{selectedDate ? selectedDate.toDateString() : <ActivityIndicator /> }</Text>
			<View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', alignItems: 'center' }}>
				<View>
					<Text style={styles.header}>{selectedDayData ? getEatenCalories(selectedDayData) : <ActivityIndicator />}</Text>
					<Text style={{ color: colors.secondary }}>Eaten</Text>
				</View>
				<View>
					<Text style={styles.header}>{selectedDayData ? getRemainingCalories(selectedDayData) : <ActivityIndicator />}</Text>
					<Text style={{ color: colors.secondary }}>Remaining</Text>
				</View>
				<View>
					<Text style={styles.header}>{selectedDayData ? getBurnedCalories(selectedDayData) : <ActivityIndicator />}</Text>
					<Text style={{ color: colors.secondary }}>Burned</Text>
				</View>
			</View>

			<ScrollView style={{ overflow: 'scroll', backgroundColor: 'red', flexGrow: 1, margin: 4 }}>
				{selectedDayData?.activities.map((activity, index) => 
					<ActivityComponent setEditActivityModalData={setEditActivityModalData} index={index} key={index} activity={activity}/>
				)}
			</ScrollView>
			<View style={{ flexDirection: 'row', gap: 4, marginBottom: 24 }}>
				<Button1 style={[styles.button, { width: '40%'}]} title='Add Excersize' onPress={() => setInsertActivityModalData({title: 'Excersize'})} />
				<Button1 style={[styles.buttonDestructive, { width: '40%'}]} title='Add Food' onPress={() => setInsertActivityModalData({title: 'Food'})} />
			</View>
			<InsertActivity getUserData={getUserData} insertActivityModalData={insertActivityModalData} selectedDate={selectedDate} setInsertActivityModalData={setInsertActivityModalData} userData={userData} />
			<EditActivity getUserData={getUserData} modalData={editActivityModalData} selectedDayData={selectedDayData} setModalData={setEditActivityModalData} userData={userData} />
			<Toast />
		</SafeAreaView>
	)
}

