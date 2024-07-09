import { View, StyleSheet, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';
import { styles } from '@/constants/ui/styles';
import { colors } from '@/constants/ui/colors';

const PwReset = () => {
	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');
	const [code, setCode] = useState('');
	const [successfulCreation, setSuccessfulCreation] = useState(false);
	const { signIn, setActive } = useSignIn();

	// Request a passowrd reset code by email
	const onRequestReset = async () => {
		try {
			await signIn!.create({
				strategy: 'reset_password_email_code',
				identifier: emailAddress
			});
			setSuccessfulCreation(true);
		} catch (err: any) {
			alert(err.errors[0].message);
		}
	};

	// Reset the password with the code and the new password
	const onReset = async () => {
		try {
			const result = await signIn!.attemptFirstFactor({
				strategy: 'reset_password_email_code',
				code,
				password
			});
			alert('Password reset successfully');

			// Set the user session active, which will log in the user automatically
			await setActive!({ session: result.createdSessionId });
		} catch (err: any) {
			alert(err.errors[0].message);
		}
	};

	return (
		<View style={styles.background}>
			<Stack.Screen options={{ headerBackVisible: !successfulCreation }} />

			{!successfulCreation && (
				<>
					<TextInput
						autoCapitalize="none"
						placeholder="simon@galaxies.dev"
						placeholderTextColor={colors.foreground}
						value={emailAddress}
						onChangeText={setEmailAddress}
						style={styles.inputField}
					/>

					<Button onPress={onRequestReset} title="Send Reset Email" color={'#6c47ff'}></Button>
				</>
			)}

			{successfulCreation && (
				<>
					<View>
						<TextInput

							value={code}
							placeholder="Code..."
							placeholderTextColor={colors.foreground}
							style={styles.inputField}
							onChangeText={setCode}
						/>
						<TextInput
							placeholder="New password"
							value={password}
							onChangeText={setPassword}
							placeholderTextColor={colors.foreground}
							secureTextEntry
							style={styles.inputField}
						/>
					</View>
					<Button onPress={onReset} title="Set new Password" color={'#6c47ff'}></Button>
				</>
			)}
		</View>
	);
};

export default PwReset;