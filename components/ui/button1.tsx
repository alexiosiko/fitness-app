import React from 'react'
import { GestureResponderEvent, Pressable, StyleProp, ViewStyle } from 'react-native'
import Text from './text'
import { colors } from '@/constants/ui/colors'

export default function Button1({ onPress, title, style, disabled, textStyle }: {
	onPress?: ((event: GestureResponderEvent) => void) | null | undefined,
	title: string,
	style?: StyleProp<ViewStyle>,
	disabled?: boolean,
	textStyle?: any
}) {

  return (
		<Pressable disabled={disabled} onPress={onPress} style={[style, { opacity: disabled ? 0.5 : 1}]}>
			<Text style={[{ textAlign: 'center' }, textStyle]}>{title}</Text>
		</Pressable>
  )
}
