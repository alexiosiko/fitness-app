import { Button, TextInput, View, StyleSheet } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import Spinner from 'react-native-loading-spinner-overlay';
import { useState } from 'react';
import { Stack } from 'expo-router';
import { styles } from '@/constants/ui/styles';
import { colors } from '@/constants/ui/colors';
import Button1 from '@/components/ui/button1';

const register = () => {
	const { isLoaded, signUp, setActive } = useSignUp();

	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [pendingVerification, setPendingVerification] = useState(false);
	const [code, setCode] = useState('');
	const [loading, setLoading] = useState(false);

	const onSignUpPress = async () => {
		if (!isLoaded) {
			return;
		}
		setLoading(true);

		try {
			// Create the user on Clerk
			await signUp.create({
				emailAddress,
				password
			});

			// Send verification Email
			await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

			// change the UI to verify the email address
			setPendingVerification(true);
		} catch (err: any) {
			alert(err.errors[0].message);
		} finally {
			setLoading(false);
		}
	};

	const onPressVerify = async () => {
		if (!isLoaded) {
			return;
		}
		setLoading(true);

		try {
			const completeSignUp = await signUp.attemptEmailAddressVerification({
				code
			});

			await setActive({ session: completeSignUp.createdSessionId });
		} catch (err: any) {
			alert(err.errors[0].message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={styles.background}>
			<Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
			<Spinner visible={loading} />

			{!pendingVerification && (
				<View style={{ gap: 12 }}>
					<TextInput
						autoCapitalize="none"
						placeholder="simon@galaxies.dev"
						value={emailAddress}
						placeholderTextColor={colors.foreground}
						onChangeText={setEmailAddress}
						style={styles.inputField}
					/>
					<TextInput
						placeholder="password"
						value={password}
						onChangeText={setPassword}
						placeholderTextColor={colors.foreground}
						secureTextEntry
						style={styles.inputField}
					/>

					<Button1 style={styles.button} onPress={onSignUpPress} title="Sign up"></Button1>
				</View>
			)}

			{pendingVerification && (
				<>
					<View>
						<TextInput
							value={code}
							placeholder="Code..."
							style={styles.inputField}
							onChangeText={setCode}
						/>
					</View>
					<Button onPress={onPressVerify} title="Verify Email" color={'#6c47ff'}></Button>
				</>
			)}
		</View>
	);
};

export default register;

