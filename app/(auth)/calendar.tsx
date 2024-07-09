import { useSettings } from '@/components/state/settings';
import Text from '@/components/ui/text'
import { styles } from '@/constants/ui/styles';
import React, { useState } from 'react'
import { SafeAreaView, Button } from 'react-native'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

export default function CalendarPage() {
	const { setSelectedDate } = useSettings();
	const [localDate, setLocalDate] = useState(new Date());
	const [show, setShow] = useState(false);
  
	const handleOnChangeDate = (event: DateTimePickerEvent, date: Date) => {
	  const selectedDate = date || localDate;
	  setShow(false);
	  setLocalDate(selectedDate);
	  setSelectedDate(selectedDate);
	}
  
	return (
	  <SafeAreaView style={[styles.background, { justifyContent: 'center', gap: 24}]}>
		<Text>Date: {localDate.toDateString()}</Text>
		<Button onPress={() => setShow(true)} title="Pick a date" />
		{show && (
		  <DateTimePicker
			value={localDate}
			mode="date"
			onChange={handleOnChangeDate as any}
		  />
		)}
	  </SafeAreaView>
	)
  }