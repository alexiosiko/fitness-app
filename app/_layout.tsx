import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { Slot, SplashScreen, useRouter, useSegments } from 'expo-router';
import { useFonts } from 'expo-font';
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Cache the Clerk JWT
const tokenCache = {
	async getToken(key: string) {
		try {
			return SecureStore.getItemAsync(key);
		} catch (err) {
			return null;
		}
	},
	async saveToken(key: string, value: string) {
		try {
			return SecureStore.setItemAsync(key, value);
		} catch (err) {
			return;
		}
	}
};

const InitialLayout = () => {
	const { isLoaded, isSignedIn } = useAuth();
	const segments = useSegments();
	const router = useRouter();

	const [fontsLoaded] = useFonts({
		RobotoMonoRegular: require('../assets/fonts/RobotoMono-Regular.ttf'),
		RobotoMonoMedium: require('../assets/fonts/RobotoMono-Medium.ttf'),
		SalsaRegular: require('../assets/fonts/Salsa-Regular.ttf'),
	});


	// If the user is signed in, redirect them to the home page
	// If the user is not signed in, redirect them to the login page
	useEffect(() => {
		if (!isLoaded) return;

		const inTabsGroup = segments[0] === '(auth)';

		if (isSignedIn && !inTabsGroup) {
			router.replace('/home');
		} else if (!isSignedIn) {
			router.replace('/login');
		}
	}, [isSignedIn]);

	useEffect(() => {
		async function prepare() {
			await SplashScreen.preventAutoHideAsync();
		}
		prepare();
	}, [])
	
	if (!fontsLoaded)
		return undefined;


	return (
		<Slot />
	)
};

const RootLayoutNav = () => {
	return (
		<ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
			<InitialLayout />
		</ClerkProvider>
	);
};

export default RootLayoutNav;