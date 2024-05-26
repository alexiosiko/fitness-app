import { Pressable, StyleSheet } from 'react-native'
import React  from 'react'
import { Activity } from '@/constants/types/user'
import { colors } from '@/constants/ui/colors'
import Text from './ui/text'
import { ModalEditDateType } from './modals/EditActivity'

export default function ActivityComponent({ activity, index, setEditActivityModalData }: {
	activity: Activity,
	index: number, 
	setEditActivityModalData: React.Dispatch<React.SetStateAction<ModalEditDateType | undefined>>
}) {
	return (
		<Pressable onPress={() => setEditActivityModalData({ index: index })} 
			style={localStyles.container}>
			<Text>{activity.name}</Text>
			<Text style={{ color: activity.calories > 0 ? colors.destructive : colors.primary }}>{Math.abs(activity.calories)}</Text>
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
		backgroundColor: colors.background
	}
})
