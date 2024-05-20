import { styles } from '@/constants/ui/styles';
import React from 'react'
import { StyleProp, Text, TextStyle } from 'react-native';

export default function Header({ children, style }: {
	children: React.ReactNode,
	style?: StyleProp<TextStyle>
}) {
  return (
	<Text style={[styles.header, style]}>{children}</Text>
  )
}
