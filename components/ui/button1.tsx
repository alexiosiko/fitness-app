import React from 'react'
import { GestureResponderEvent, Pressable, StyleProp, ViewStyle } from 'react-native'
import Text from './text'
import { styles } from '@/constants/ui/styles'
import { colors } from '@/constants/ui/colors'

export default function Button1({ onPress, title, style }: {
	onPress?: ((event: GestureResponderEvent) => void) | null | undefined,
	title: string,
	style?: StyleProp<ViewStyle>
}) {
  return (
		<Pressable onPress={onPress} style={style}>
			<Text style={{ textAlign: 'center', color: colors.primaryforeground }}>{title}</Text>
		</Pressable>
  )
}
