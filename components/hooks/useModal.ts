import { ModalEditDateType } from '@/app/(auth)/home';
import React, { useState } from 'react'
import { ModalDataType } from '../modals/InsertActivity';

export default function useModal() {
	const [modalActivityData, setActivityModalData] = useState<ModalDataType>({
		title: '',
		visible: false,
	});
	const [modalEditData, setEditModalData] = useState<ModalEditDateType>({
		visible: false,
		index: -1
	});

	const handleOnModal = (name: string) => {
		setActivityModalData({
			visible: true,
			title: name,
		})
	}
	const handleEditActivity = (index: number) => {
		setEditModalData({
			visible: true,
			index: index
		})
	}
	return ({
		modalActivityData,
		setActivityModalData,
		modalEditData,
		setEditModalData,
		handleOnModal,
		handleEditActivity
	})
}
