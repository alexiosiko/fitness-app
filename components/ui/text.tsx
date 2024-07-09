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
		fontFamily: 'RobotoMonoMedium',
		fontSize: 20,
		color: light ? (colors.secondarybackground) : colors.foreground
	}, style]}>{children}</CustomText>
  )
}

