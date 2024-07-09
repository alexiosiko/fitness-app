import { StyleSheet } from "react-native"
import { colors } from "./colors"



export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 20
	},
	button: {
		padding: 10,
		borderRadius: 10,
		alignSelf: 'center',
		backgroundColor: colors.secondary,
		color: colors.secondaryforeground,
	},
	buttonAccent: {
		padding: 10,
		borderRadius: 10,
		alignSelf: 'center',
		backgroundColor: colors.accent,
	},
	buttonOutline: {
		padding: 10,
		alignSelf: 'center',
		borderColor: colors.foreground,
		borderRadius: 10,
		borderWidth: 1,
	},
	buttonGhost: {
		padding: 10,
		alignSelf: 'center',
	},
	buttonDestructive: {
		padding: 10,
		borderRadius: 10,
		alignSelf: 'center',
		backgroundColor: colors.destructive,
		color: colors.destructiveforeground,
	},
	title: {
		color: colors.foreground,
		fontSize: 40,
		fontWeight: "500", 
		textAlign: 'center',
	},
	header: {
		fontSize: 30,
		textAlign: 'center',
	},
	background: {
		flex: 1,
		padding: 10,
		backgroundColor: colors.background,
		justifyContent: 'center',
		color: colors.foreground,
		height: '100%',
	},
	inputField: {
		height: 50,
		borderColor: colors.primary,
		borderRadius: 10,
		padding: 10,
		backgroundColor: '#fff'
	},
})