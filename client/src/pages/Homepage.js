import { Col, Row } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ItemList from '../components/ItemList.js';
import DefaultLayout from '../components/DefaultLayout.js';

const Homepage = () => {
	const [itemsData, setItemsData] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('drinks');

	const categories = [
		{
			name: 'hot drinks',
			imageUrl:
				'https://img.freepik.com/premium-vector/cup-with-hot-drink-smoking-coffee-logo-tea-mug-icon-isolated-white-background_80590-12379.jpg?w=740',
		},
		{
			name: 'cold drinks',
			imageUrl:
				'https://image.similarpng.com/very-thumbnail/2020/08/Summer-cold-drink-clipart-PNG.png',
		},
		{
			name: 'rice',
			imageUrl: 'https://cdn-icons-png.flaticon.com/512/3174/3174880.png',
		},
		{
			name: 'meat',
			imageUrl:
				'https://cdn0.iconfinder.com/data/icons/food-drink-set/177/chicken-512.png',
		},
		{
			name: 'seafood',
			imageUrl:
				'https://previews.123rf.com/images/olegtoka/olegtoka1703/olegtoka170300020/73768234-illustration-of-cooked-seafood-crabs-with-lime-and-sauce.jpg',
		},
		{
			name: 'noodles',
			imageUrl: 'https://cdn-icons-png.flaticon.com/512/1471/1471262.png',
		},
	];

	const dispatch = useDispatch();

	useEffect(() => {
		const getAllItems = async () => {
			try {
				dispatch({ type: 'SHOW_LOADING' });
				const { data } = await axios.get('/api/items/get-item');
				setItemsData(data);
			} catch (error) {
				console.error('Error fetching items:', error);
			} finally {
				dispatch({ type: 'HIDE_LOADING' });
			}
		};

		getAllItems();
	}, [dispatch]);

	return (
		<DefaultLayout>
			<div className='d-flex'>
				{categories.map((category) => (
					<div
						key={category.name}
						className={`d-flex category ${
							selectedCategory === category.name && 'category-active'
						}`}
						onClick={() => setSelectedCategory(category.name)}
					>
						<h4>{category.name}</h4>
						<img
							src={category.imageUrl}
							alt={category.name}
							height='40'
							width='60'
						/>
					</div>
				))}
			</div>

			<Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
				{itemsData
					.filter((item) => item.category === selectedCategory)
					.map((item) => (
						<Col key={item.id} xs={24} lg={6} md={12} sm={12}>
							<ItemList item={item} />
						</Col>
					))}
			</Row>
		</DefaultLayout>
	);
};

export default Homepage;
