import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout.js';

const CustomerPage = () => {
	const [billsData, setBillsData] = useState([]);
	const dispatch = useDispatch();

	const getAllBills = async () => {
		try {
			dispatch({ type: 'SHOW_LOADING' });
			const { data } = await axios.get('/api/bills/get-bills');
			setBillsData(data);
		} catch (error) {
			console.error('Error fetching bills:', error);
		} finally {
			dispatch({ type: 'HIDE_LOADING' });
		}
	};

	useEffect(() => {
		getAllBills();
	}, []); // Empty dependency array to call once on component mount

	const columns = [
		{ title: 'ID', dataIndex: '_id' },
		{ title: 'Customer Name', dataIndex: 'customerName' }, // Fixed typo in "Customer"
		{ title: 'Contact No', dataIndex: 'customerNumber' },
		{ title: 'Total Amount', dataIndex: 'totalAmount' },
	];

	return (
		<DefaultLayout>
			<h1>Customer Page</h1>
			<Table
				columns={columns}
				dataSource={billsData}
				bordered
				pagination={false}
			/>
		</DefaultLayout>
	);
};

export default CustomerPage;
