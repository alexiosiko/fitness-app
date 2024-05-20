import React from 'react'
import { GestureResponderEvent, Pressable } from 'react-native'
import Text from './text'
import { styles } from '@/constants/ui/styles'
import { colors } from '@/constants/ui/colors'

export default function Button1({ onPress, title }: {
	onPress?: ((event: GestureResponderEvent) => void) | null | undefined,
	title: string,
}) {
  return (
		<Pressable onPress={onPress}  style={[styles.button, { width: '100%'}]}>
			<Text style={{ textAlign: 'center', color: colors.primaryforeground }}>{title}</Text>
		</Pressable>
  )
}
