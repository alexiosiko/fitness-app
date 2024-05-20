import useUserData from '@/components/hooks/useUserData';
import Text from '@/components/ui/text'
import { styles } from '@/constants/ui/styles'
import React, { useEffect }  from 'react'
import { View } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';

export default function Home() {
	const { userData, isFetching, todayData, getEatenCalories, getBurnedCalories, getRemainingCalories } = useUserData()
	useEffect(() => {
		console.log(userData?.userId);
	}, [userData])
	return (
		<View style={{ alignItems: 'center', gap: 24}}>
			<Text>Target: {true ? <Spinner  size={23}/> : userData?.dailyCalorieTarget}</Text>
			<View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly'}}>
				<View>
					<Text style={styles.header}>{getEatenCalories()}</Text>
					<Text>Eaten</Text>
				</View>
				<View>
					<Text style={styles.header}>{getRemainingCalories()}</Text>
					<Text>Remaining</Text>
				</View>
				<View>
					<Text style={styles.header}>{getBurnedCalories()}</Text>
					<Text>Burned</Text>
				</View>
			</View>
			{todayData?.activities.map((activity, index) => 
				<View key={index} style={{ flexDirection: 'row', justifyContent: 'space-around', width: "100%"}}>
					<Text>{activity.name}</Text>
					<Text>{activity.calories}</Text>
				</View>
			)}
		</View>
	)
}
