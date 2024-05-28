import React, { useState } from 'react'
import { ModalDataType } from '../modals/InsertExercise';

export default function useModal() {
	const [insertActivityModalData, setInsertActivityModalData] = useState<ModalDataType | undefined>(undefined);

	return ({
		insertActivityModalData,
		setInsertActivityModalData
	})
}
