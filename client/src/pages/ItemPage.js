import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Table, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout.js';

const ItemPage = () => {
	const dispatch = useDispatch();
	const [itemsData, setItemsData] = useState([]);
	const [popupModal, setPopupModal] = useState(false);
	const [editItem, setEditItem] = useState(null);

	const getAllItems = async () => {
		try {
			dispatch({ type: 'SHOW_LOADING' });
			const { data } = await axios.get('/api/items/get-item');
			setItemsData(data);
			dispatch({ type: 'HIDE_LOADING' });
		} catch (error) {
			dispatch({ type: 'HIDE_LOADING' });
			message.error('Failed to fetch items.');
			console.error(error);
		}
	};

	// useEffect to fetch items
	useEffect(() => {
		getAllItems();
		//eslint-disable-next-line
	}, []);

	// Handle delete
	const handleDelete = async (record) => {
		try {
			dispatch({ type: 'SHOW_LOADING' });
			await axios.post('/api/items/delete-item', { itemId: record._id });
			message.success('Item deleted successfully.');
			getAllItems();
			setPopupModal(false);
		} catch (error) {
			message.error('Failed to delete item.');
			console.error(error);
		} finally {
			dispatch({ type: 'HIDE_LOADING' });
		}
	};

	// Table columns configuration
	const columns = [
		{ title: 'Name', dataIndex: 'name' },
		{
			title: 'Image',
			dataIndex: 'image',
			render: (image, record) => (
				<img src={image} alt={record.name} height='60' width='60' />
			),
		},
		{ title: 'Price', dataIndex: 'price' },
		{
			title: 'Actions',
			dataIndex: '_id',
			render: (id, record) => (
				<div>
					<EditOutlined
						style={{ cursor: 'pointer', marginRight: 16 }}
						onClick={() => {
							setEditItem(record);
							setPopupModal(true);
						}}
					/>
					<DeleteOutlined
						style={{ cursor: 'pointer' }}
						onClick={() => handleDelete(record)}
					/>
				</div>
			),
		},
	];

	// Handle form submission
	const handleSubmit = async (value) => {
		try {
			dispatch({ type: 'SHOW_LOADING' });
			if (editItem === null) {
				await axios.post('/api/items/add-item', value);
				message.success('Item added successfully.');
			} else {
				await axios.put('/api/items/edit-item', {
					...value,
					itemId: editItem._id,
				});
				message.success('Item updated successfully.');
			}
			getAllItems();
			setPopupModal(false);
		} catch (error) {
			message.error('Failed to save item.');
			console.error(error);
		} finally {
			dispatch({ type: 'HIDE_LOADING' });
		}
	};

	return (
		<DefaultLayout>
			<div className='d-flex justify-content-between'>
				<h1>Item List</h1>
				<Button type='primary' onClick={() => setPopupModal(true)}>
					Add Item
				</Button>
			</div>

			<Table columns={columns} dataSource={itemsData} bordered rowKey='_id' />

			{popupModal && (
				<Modal
					title={`${editItem !== null ? 'Edit Item' : 'Add New Item'}`}
					visible={popupModal}
					onCancel={() => {
						setEditItem(null);
						setPopupModal(false);
					}}
					footer={null}
				>
					<Form
						layout='vertical'
						initialValues={editItem}
						onFinish={handleSubmit}
					>
						<Form.Item
							name='name'
							label='Name'
							rules={[{ required: true, message: 'Please enter a name' }]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							name='price'
							label='Price'
							rules={[{ required: true, message: 'Please enter a price' }]}
						>
							<Input type='number' />
						</Form.Item>

						<Form.Item
							name='image'
							label='Image URL'
							rules={[{ required: true, message: 'Please enter an image URL' }]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							name='category'
							label='Category'
							rules={[{ required: true, message: 'Please select a category' }]}
						>
							<Select>
								<Select.Option value='hot drinks'>Hot Drinks</Select.Option>
								<Select.Option value='cold drinks'>Cold Drinks</Select.Option>
								<Select.Option value='rice'>Rice</Select.Option>
								<Select.Option value='noodles'>Noodles</Select.Option>
								<Select.Option value='meat'>Meat</Select.Option>
								<Select.Option value='seafood'>Seafood</Select.Option>
							</Select>
						</Form.Item>

						<div className='d-flex justify-content-end'>
							<Button type='primary' htmlType='submit'>
								SAVE
							</Button>
						</div>
					</Form>
				</Modal>
			)}
		</DefaultLayout>
	);
};

export default ItemPage;
