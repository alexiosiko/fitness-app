import { Pressable, StyleSheet } from 'react-native'
import React, { useState }  from 'react'
import { colors } from '@/constants/ui/colors'
import Text from './ui/text'
import EditFood, { ModalEditDateType } from './modals/EditFood'
import { Day, Food, UserDataType } from '@/constants/types/user'

export default function FoodComponent({ food, index, selectedDayData, userData, getUserData }: {
	food: Food,
	userData: UserDataType,
	getUserData: () => Promise<void>,
	index: number, 
	selectedDayData: Day | undefined
}) {
	const [ showEditModal, setShowEditModal ]= useState<boolean>(false);
	return (
		<Pressable
		onPress={() => setShowEditModal(true)}
			style={localStyles.container}>
			<Text>{food.name}</Text>
			<Text>{food.protein} protein</Text>
			<Text style={{ color: colors.destructive}}>{Math.abs(food.calories)}</Text>
			{showEditModal && <EditFood
			userData={userData}
			selectedDayData={selectedDayData}
			setShowEditModal={setShowEditModal} getUserData={getUserData} index={index} />}
		</Pressable>
	)
}


const localStyles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignSelf: 'center',
		width: '100%',
		height: 42,
		borderRadius: 10,
		alignItems: 'center',
		paddingLeft: 12,
		marginBottom: 10,
		paddingRight: 12,
		backgroundColor: colors.backgroundother
	}
})
