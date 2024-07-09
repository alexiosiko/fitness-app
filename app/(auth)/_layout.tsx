import { Tabs } from 'expo-router';
import {  Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { colors } from '@/constants/ui/colors';
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
				backgroundColor: colors.background
			},

		}}>
			{/* <Tabs.Screen
			  name="stats"
			  options={{
				headerTitleAlign: 'center',
				tabBarIconStyle: {
					top: 8,
				},
				headerTitleStyle: {
					fontSize: 32
				},
				title: 'Statistics',
				tabBarLabel: '',
				tabBarIcon: ({ color }) => <Ionicons name="stats-chart-outline" size={32} color="black" />,
			  }}
			  redirect={!isSignedIn}
			/> */}
			<Tabs.Screen
			  name="calendar"
			  options={{
				headerTitleAlign: 'center',
				headerStyle: {
					backgroundColor: colors.background
				},
				tabBarIconStyle: {
					top: 8,
					backgroundColor: colors.foreground
				},
				headerTitleStyle: {
					color: colors.foreground
				},
				title: 'Calendar',
				tabBarLabel: '',
				tabBarIcon: ({ color }) => <Octicons name="calendar" size={28} color="white" />,
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
				headerStyle: {
					backgroundColor: colors.background,
				},
				headerTitleStyle: {
					color: colors.foreground
				},
				title: 'Home',
				tabBarLabel: '',
				tabBarIcon: ({ color }) => <Octicons name="home" size={28} color="white" />,
			  }}
			  redirect={!isSignedIn}
			/>
			
			<Tabs.Screen
			name="settings"
			options={{
				headerTitleAlign: 'center',
				tabBarIconStyle: {
					top: 8,
				},
				headerStyle: {
					backgroundColor: colors.background
				},
				headerTitleStyle: {
					color: colors.foreground
				},
				title: 'Settings',
				tabBarLabel: '',
				tabBarIcon: ({ color }) => <Octicons name="gear" size={28} color="white" />,
			}}
			redirect={!isSignedIn}
		  />
		</Tabs>
	  );
};

export default TabsPage;