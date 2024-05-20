import { colors } from '@/constants/ui/colors';
import React from 'react'
import { Text as CustomText, StyleProp, TextStyle } from "react-native";

export default function Text({ children, style, light = true, dark }: {
	children: React.ReactNode;
	style?: StyleProp<TextStyle>,
	light?: boolean,
	dark?: boolean,
}) {
  return (
	<CustomText style={[{
		textAlign: 'center',
		fontSize: 20,
		color: dark ? (colors.background) : colors.foreground
	}, style]}>{children}</CustomText>
  )
}

