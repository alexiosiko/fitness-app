import { styles } from '@/constants/ui/styles';
import React from 'react'
import { StyleProp, Text, TextStyle } from 'react-native';

export default function Title({ children, style }: {
	children: React.ReactNode,
	style?: StyleProp<TextStyle>
}) {
  return (
	<Text style={[styles.title, style]}> {children}</Text>
  )
}
