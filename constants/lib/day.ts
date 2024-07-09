export function isSameDay(date1: string | Date, date2: string | Date): boolean {
	const d1 = new Date(date1);
	const d2 = new Date(date2);

	// Normalize dates to local time zone
	const localD1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
	const localD2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());

	return localD1.getFullYear() === localD2.getFullYear() &&
		localD1.getMonth() === localD2.getMonth() &&
		localD1.getDate() === localD2.getDate();
}
