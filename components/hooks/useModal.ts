import React, { useState } from 'react'
import { ModalDataType } from '../modals/InsertActivity';

export default function useModal() {
	const [insertActivityModalData, setInsertActivityModalData] = useState<ModalDataType | undefined>(undefined);

	return ({
		insertActivityModalData,
		setInsertActivityModalData
	})
}
