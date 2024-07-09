import useUserData from '@/components/hooks/useUserData';
import { useSettings } from '@/components/state/settings';
import Text from '@/components/ui/text'
import { colors } from '@/constants/ui/colors';
import { styles } from '@/constants/ui/styles'
import React, { useState } from 'react'
import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import Toast from 'react-native-toast-message';
import { Circle } from 'react-native-progress';
import InsertFood from '@/components/modals/InsertFood';
import FoodComponent from '@/components/foodcomponent';
import ExersizeComponent from '@/components/exercisecomponent';
import InsertExercise from '@/components/modals/InsertExercise';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Home() {
	const { userData, getEatenCalories, getBurnedCalories, selectedDayData, getRemainingCalories, getUserData } = useUserData();
	const [ showFoodModal, setShowFoodModal] = useState<boolean>(false);
	const [ showExerciseModal, setShowExerciseModal] = useState<boolean>(false);
	const { selectedDate, incrementSelectedDate, decrementSelectedDate } = useSettings();
	const getCaloriesProgress = (): number => {
		if (selectedDayData == undefined)
			return 0;
		const numerator = getRemainingCalories(selectedDayData)
		const denomerator = userData?.dailyCalorieTarget;
		
		if (!numerator || !denomerator)
			return 0;

		return numerator / denomerator;
	}
	// const testFetch = async () => {
	// 	try {
	// 		let url = "https://us-central1-fitness-server-1-b09f7.cloudfunctions.net/app/test";
	// 		console.log('Fetching from:', url);
	// 		const res = await axios.get(url);
	// 		console.log('Response:', res.data);
	// 	} catch (e: any) {
	// 		console.error('Fetch error:', e.message);
	// 	}
	// }
	
	// useEffect(() => {
	// 	testFetch();
	// }, [])
	return (
		<SafeAreaView style={styles.background}>
			{/* <LinearGradient 
				colors={[colors.gradienttop, colors.gradientbottom]}
			> */}
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
					<AntDesign onPress={() => decrementSelectedDate()} name="caretleft" size={24} color="white" />
					<View style={{ }}>
						<Text style={[ { padding: 24, fontSize: 24},]}>{selectedDate ? selectedDate.toUTCString() : <ActivityIndicator /> }</Text>
					</View>
					<AntDesign onPress={() => incrementSelectedDate()} name="caretright" size={24} color="white" />
				</View>
				<ScrollView> 
					<View style={localStyles.subContainer}>
						<View>
							<Text style={styles.header}>{selectedDayData ? getEatenCalories(selectedDayData) : <ActivityIndicator />}</Text>
							<Text>Eaten</Text>
						</View>
						<View>
							<Text style={styles.header}>{selectedDayData ? getRemainingCalories(selectedDayData) : <ActivityIndicator />}</Text>
							<Text>Remaining</Text>
							<Circle thickness={4} style={{ position: 'absolute', right: -18, bottom: -40}} unfilledColor={colors.background
							} color={colors.accent} progress={getCaloriesProgress()} size={145} borderWidth={0} />
						</View>
						<View>
							<Text style={styles.header}>{selectedDayData ? getBurnedCalories(selectedDayData) : <ActivityIndicator />}</Text>
							<Text>Burned</Text>
						</View>
					</View>
					{ userData && 
					<View style={{ gap: 24, marginTop: 24}}>
						<Pressable onPress={() => setShowFoodModal(true)} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
							<Text>Foods</Text>
							<Ionicons name='add' size={32} color="white" />
						</Pressable>
						<View style={{ minHeight: 100 }}>
							{selectedDayData?.foods?.map((food, index) => 
								<FoodComponent getUserData={getUserData} userData={userData} selectedDayData={selectedDayData} index={index} food={food} key={index} />
							)}
						</View>
						<Pressable onPress={() => setShowExerciseModal(true)} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
							<Text>Exercises</Text>
							<Ionicons name='add' size={32} color="white" />
						</Pressable>
						<View style={{ minHeight: 100}}>
							{selectedDayData?.exercises?.map((exercise, index) => 
								<ExersizeComponent exercise={exercise} getUserData={getUserData} index={index} selectedDayData={selectedDayData} userData={userData} key={index} />
							)}
						</View>
					</View>}
					{showExerciseModal && userData && <InsertExercise getUserData={getUserData} setShowExerciseModal={setShowExerciseModal}  userData={userData} />}
					{showFoodModal && userData && <InsertFood userData={userData} setShowFoodModal={setShowFoodModal} getUserData={getUserData} />}
				</ScrollView>
				<Toast />
			{/* </LinearGradient> */}
		</SafeAreaView>
	)
}


const localStyles = StyleSheet.create({
	subContainer: {
		flexDirection: 'row',
		borderRadius: 20,
		backgroundColor: colors.secondary,
		gap: 40,
		justifyContent: 'space-evenly',
		height: 180,
		alignItems: 'center',
	}
})