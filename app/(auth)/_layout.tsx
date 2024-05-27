import { Tabs } from 'expo-router';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { colors } from '@/constants/ui/colors';
import Toast from 'react-native-toast-message';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
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
			tabBarStyle: {
				backgroundColor: colors.navbackground
			},
			headerStyle: {
				backgroundColor: colors.background,
			},
			headerTintColor: colors.foreground,
		}}>
		  <Tabs.Screen
			name="settings"
			options={{
				headerTitleAlign: 'center',
				tabBarIconStyle: {
					top: 8,
				},
				title: 'Settings',
				tabBarLabel: '',
				tabBarIcon: ({ color }) => <Octicons name="gear" size={32} color="black" />,
			}}
			redirect={!isSignedIn}
		  />
			<Tabs.Screen
			  name="home"
			  options={{
				headerTitleAlign: 'center',
				tabBarIconStyle: {
					top: 8,
				},
				title: 'Home',
				tabBarLabel: '',
				tabBarIcon: ({ color }) => <Octicons name="home" size={32} color="black" />,
			  }}
			  redirect={!isSignedIn}
			/>
		</Tabs>
	  );
};

export default TabsPage;