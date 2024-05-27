import React from 'react'
import { ActivityIndicator, GestureResponderEvent, Pressable, StyleProp, ViewStyle } from 'react-native'
import Text from './text'
import { styles } from '@/constants/ui/styles'
import { colors } from '@/constants/ui/colors'

export default function Button1({ onPress, title, style, disabled }: {
	onPress?: ((event: GestureResponderEvent) => void) | null | undefined,
	title: string,
	style?: StyleProp<ViewStyle>
	disabled?: boolean
}) {

  return (
		<Pressable disabled={disabled} onPress={onPress} style={[style, { opacity: disabled ? 0.5 : 1}]}>
			<Text style={{ textAlign: 'center', color: colors.primaryforeground }}>{title}</Text>
		</Pressable>
  )
}
