import Button1 from '@/components/ui/button1';
import { colors } from '@/constants/ui/colors';
import { styles } from '@/constants/ui/styles';
import { useSignIn } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Pressable, Text, Alert, Button } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const login = () => {
	const { signIn, setActive, isLoaded } = useSignIn();

	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const onSignInPress = async () => {
		if (!isLoaded) {
			return;
		}
		setLoading(true);
		try {
			const completeSignIn = await signIn.create({
				identifier: emailAddress,
				password
			});

			// This indicates the user is signed in
			await setActive({ session: completeSignIn.createdSessionId });
		} catch (err: any) {
			alert(err.errors[0].message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={[styles.container, { gap: 12}]}>
			<Spinner visible={loading} />

			<TextInput
				autoCapitalize="none"
				placeholder="Email"
				value={emailAddress}
				onChangeText={setEmailAddress}
				style={styles.inputField}
			/>
			<TextInput
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
				style={styles.inputField}
			/>

			<Button1 onPress={() => onSignInPress()} title='Sign In'></Button1>
			<Link href="/reset" asChild style={{ alignItems: 'center'}}>
				<Pressable>
					<Text>Forgot password?</Text>
				</Pressable>
			</Link>
			<Link href="/register" asChild style={{ alignItems: 'center'}}>
				<Pressable>
					<Text>Create Account</Text>
				</Pressable>
			</Link>
		</View>
	);
};

export default login;

