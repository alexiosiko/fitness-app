import { Pressable, StyleSheet } from 'react-native'
import React, { useState }  from 'react'
import { colors } from '@/constants/ui/colors'
import Text from './ui/text'
import { ModalEditDateType } from './modals/EditFood'
import { Day, Exercise, Food, UserDataType } from '@/constants/types/user'
import EditExercise from './modals/EditExercise'

export default function ExersizeComponent({ exercise, index, selectedDayData, userData, getUserData }: {
	exercise: Exercise,
	userData: UserDataType,
	getUserData: () => Promise<void>,
	index: number, 
	selectedDayData: Day | undefined
}) {
	const [ showExerciseModal, setShowExerciseModal ]= useState<boolean>(false);

	return (
		<Pressable
			onPress={() => setShowExerciseModal(true)}
			style={localStyles.container}>
			<Text>{exercise.name}</Text>
			<Text>for {exercise.timeInMinutes} mins</Text>
			<Text style={{ color: colors.primary }}>{exercise.calories}</Text>
			{showExerciseModal && <EditExercise
			userData={userData}
			index={index}
			getUserData={getUserData}
			selectedDayData={selectedDayData}
			setShowEditModal={setShowExerciseModal} />}
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
