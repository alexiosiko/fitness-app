import { colors } from '@/constants/ui/colors';
import React from 'react'
import { Text as CustomText, StyleProp, TextStyle } from "react-native";

export default function Text({ children, style, light }: {
	children: React.ReactNode;
	style?: StyleProp<TextStyle>,
	light?: boolean,
}) {
  return (
	<CustomText style={[{
		textAlign: 'center',
		fontFamily: 'SalsaRegular',
		fontSize: 20,
		color: light ? (colors.backgroundother) : colors.foreground
	}, style]}>{children}</CustomText>
  )
}

