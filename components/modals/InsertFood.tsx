import { styles } from '@/constants/ui/styles';
import React, { useState } from 'react';
import { Modal, View, TextInput, SafeAreaView, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import Button1 from '../ui/button1';
import Text from '../ui/text';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { colors } from '@/constants/ui/colors';
import { useSettings } from '../state/settings';
import { Food, UserDataType } from '@/constants/types/user';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function InsertFood({ setShowFoodModal, userData, getUserData }: {
	userData: UserDataType;
	getUserData: () => Promise<void>;
	setShowFoodModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [ food, setFood ] = useState<Food>({ name: '', calories: 0, protein: 0 });
	const [ isFetching, setIsFetching ] = useState<boolean>(false);
	const { selectedDate } = useSettings();
	const [ description, setDescription ] = useState<string>("");

	const handleCalorieChange = (str: string) => {
		let calories = Number(str);
		if (isNaN(calories))
			calories = 0;
		setFood({ ...food, calories: calories });
	};

	const handleProteinChange = (str: string) => {
		let protein = Number(str);
		if (isNaN(protein))
			protein = 0;
		setFood({ ...food, protein: protein });
	};

	const validateForm = () => {
		if (!food)
			throw Error("Food data is empty");
		if (food.name == "")
			throw Error("Food name is empty");
		if (food.calories == 0)
			throw Error("Calories cannot be 0");
		if (selectedDate == undefined)
			console.error("Selected date is undefined");
	};

	const handleAItoNutrients = async () => {
		try {
			if (isFetching)
				return;
			setIsFetching(true);

			if (description.length < 3)
				throw Error("Name cannot be less than 3 characters");

			const res = await axios.post(process.env.EXPO_PUBLIC_API_DOMAIN + "/openai/food-nutrients", {
				description: description
			});
			console.log(res.data);
			if (res.status != 200)
				throw Error(res.data.message);
			setFood({ name: food.name, ...res.data });
		} catch (e: any) {
			console.error(e);
			Toast.show({
				type: 'error',
				text1: e.message
			});
		} finally {
			setIsFetching(false);
		}
	};

	const handleInsertActivity = async () => {
		if (isFetching)
			return;
		setIsFetching(true);
		try {
			validateForm();
			console.log(selectedDate);
			const res = await axios.put(process.env.EXPO_PUBLIC_API_DOMAIN + "/users/foods/insert", {
				userId: userData!.userId,
				food: food,
				selectedDate: selectedDate
			});
			if (res.status != 200)
				throw Error(res.data.message);
			Toast.show({
				text1: "Successfully added activity"
			});
			getUserData();
			setShowFoodModal(false);
		} catch (e: any) {
			Toast.show({
				type: 'error',
				text1: e.message
			});
		} finally {
			setIsFetching(false);
		}
	};

	return (
		<Modal
			presentationStyle='pageSheet'
			animationType="slide"
		>
			<SafeAreaView style={{ flex: 1 }}>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					style={{ flex: 1 }}
				>
					<View
						onTouchStart={() => Keyboard.dismiss()}
						style={[styles.background, { justifyContent: 'flex-start', gap: 24 }]}
					>
						<Text style={[styles.header, { marginBottom: '10%' }]}>Add New Food</Text>
						<View>
							<Text>Food Name (12 letters max)</Text>
							<TextInput
								onChangeText={name => setFood({ ...food, name: name })}
								value={food?.name}
								maxLength={12}
								style={styles.inputField}
								placeholderTextColor='lightgray'
								placeholder="Food Name"
							/>
						</View>
						<View>
							<Text>Calories Eaten</Text>
							<TextInput
								style={styles.inputField}
								placeholder="Enter Calories"
								keyboardType="numbers-and-punctuation"
								value={food?.calories?.toString()}
								onChangeText={handleCalorieChange}
							/>
						</View>
						<View>
							<Text>Protein Eaten (g)</Text>
							<TextInput
								style={styles.inputField}
								placeholder="Enter Calories"
								keyboardType="numbers-and-punctuation"
								value={food?.protein?.toString()}
								onChangeText={handleProteinChange}
							/>
						</View>
						<View style={{ flexDirection: 'row', gap: 4, justifyContent: 'center' }}>
							<Button1 disabled={isFetching} style={[styles.buttonDestructive, { width: '45%' }]} title="Cancel" onPress={() => setShowFoodModal(false)} />
							<Button1 disabled={isFetching} style={[styles.button, { width: '45%' }]} title="Add" onPress={() => handleInsertActivity()} />
						</View>
						<MaterialCommunityIcons onPress={() => handleAItoNutrients()} style={[styles.button, { backgroundColor: 'lightblue' }]} name="robot-outline" size={24} color="black" />
						<TextInput
							style={styles.inputField}
							placeholder="Name of food and amount"
							keyboardType="numbers-and-punctuation"
							value={description}
							onChangeText={setDescription}
						/>
					</View>
					<Toast />
				</KeyboardAvoidingView>
			</SafeAreaView>
		</Modal>
	);
}
