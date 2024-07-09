import Button1 from '@/components/ui/button1';
import Text from '@/components/ui/text';
import { colors } from '@/constants/ui/colors';
import { styles } from '@/constants/ui/styles';
import { useSignIn } from '@clerk/clerk-expo';
import { Link, router, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, TextInput, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const login = () => {
	const { signIn, setActive, isLoaded } = useSignIn();
	const [emailAddress, setEmailAddress] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();
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
		<View style={[styles.background, { gap: 75}]}>
			<Spinner visible={loading} />
			<View style={{ gap: 12 }}>
				<TextInput
				keyboardType='default'
					autoCapitalize="none"
					placeholderTextColor={colors.foreground}
					placeholder="Email"
					value={emailAddress}
					onChangeText={setEmailAddress}
					style={styles.inputField}
				/>
				<TextInput
					placeholder="Password"
					placeholderTextColor={colors.foreground}
					value={password}
					onChangeText={setPassword}
					secureTextEntry
					style={styles.inputField}
				/>
				<Button1 textStyle={{ color: colors.accentforeground }} style={styles.buttonAccent} onPress={() => onSignInPress()} title='Sign In'></Button1>
			</View>
			<View style={{ gap: 12 }}>
				<Button1 onPress={() => router.push('/register')} textStyle={{ color: colors.foreground }} style={[styles.button, { width: 250 }]} title='Create Account' />
				<Button1 onPress={() => router.push('/reset')} textStyle={{ color: colors.foreground }} style={[styles.buttonGhost, { width: 250 }]} title='Forgot Password?' />
			</View>
		</View>
	);
};

export default login;

