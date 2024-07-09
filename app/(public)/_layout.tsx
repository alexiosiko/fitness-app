import { colors } from '@/constants/ui/colors'
import { styles } from '@/constants/ui/styles'
import { Stack, Tabs } from 'expo-router'
import React from 'react'

export default function _layout() {
  return (
	<Stack>
		<Stack.Screen options={{
			title: 'Login',
			headerStyle: {
				backgroundColor: colors.background,
			},
			headerTitleAlign: 'center',
			headerTitleStyle: styles.header,
			headerTintColor: colors.foreground,
		}} name='login' />
		<Stack.Screen options={{
			title: 'Register',
			headerStyle: {
				backgroundColor: colors.background,
			},
			headerTitleStyle: styles.header,
			headerTintColor: colors.foreground,
		}} name='register' />
		<Stack.Screen options={{
			title: 'Reset',
			headerStyle: {
				backgroundColor: colors.background,
			},
			headerTitleStyle: styles.header,
			headerTintColor: colors.foreground,
		}} name='reset' />
	</Stack>
)
}
