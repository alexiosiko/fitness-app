import { Tabs } from 'expo-router';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { colors } from '@/constants/ui/colors';

export const LogoutButton = () => {
	const { signOut } = useAuth();

	const doLogout = () => {
		signOut();
	};

	return (
		<Pressable onPress={doLogout} style={{ marginRight: 10 }}>
			<Ionicons name="log-out-outline" size={24} color={'#fff'} />
		</Pressable>
	);
};

const TabsPage = () => {
	const { isSignedIn } = useAuth();

	return (
		<Tabs screenOptions={{
			headerStyle: {
				backgroundColor: colors.background,
			},
			headerTintColor: colors.foreground,
		}}>
		  <Tabs.Screen
			name="settings"
			options={{
				title: 'Settings',
				tabBarIcon: ({ color }) => <FontAwesome size={28} name="gear" color={color} />,
			}}
			redirect={!isSignedIn}
		  />
			<Tabs.Screen
			  name="home"
			  options={{
				title: 'Home',
				tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
			  }}
			  redirect={!isSignedIn}
			/>
		</Tabs>
	  );
};

export default TabsPage;