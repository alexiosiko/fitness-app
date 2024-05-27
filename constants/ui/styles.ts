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
		backgroundColor: colors.primary,
		color: colors.primaryforeground,
	},
	buttonOutline: {
		padding: 10,
		alignSelf: 'center',
		borderColor: colors.foreground,
		borderRadius: 10,
		borderWidth: 1,
	},
	buttonDestructive: {
		padding: 10,
		borderRadius: 10,
		alignSelf: 'center',
		backgroundColor: colors.destructive,
		color: colors.foreground,
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
		backgroundColor: colors.background,
		color: colors.foreground,
		height: '100%',
	},
	inputField: {
		marginVertical: 4,
		height: 50,
		borderWidth: 1,
		borderColor: colors.primary,
		borderRadius: 10,
		padding: 10,
		backgroundColor: '#fff'
	},
})