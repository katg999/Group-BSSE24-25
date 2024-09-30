import { Form, Input, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const Login = () => {
	const [loading, setLoading] = useState(false); // Correctly manage loading state
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Handle form submission
	const submitHandler = async (values) => {
		try {
			setLoading(true); // Set loading state to true
			dispatch({ type: 'SHOW_LOADING' });
			const { data } = await axios.post('/api/users/login', values);
			dispatch({ type: 'HIDE_LOADING' });
			message.success('Login successful');
			localStorage.setItem(
				'user',
				JSON.stringify({ ...data.user, password: '' })
			);
			navigate('/'); // Redirect after login
		} catch (error) {
			dispatch({ type: 'HIDE_LOADING' });
			message.error('Something went wrong');
		} finally {
			setLoading(false); // Reset loading state
		}
	};

	// Prevent logged-in users from accessing the login page
	useEffect(() => {
		if (localStorage.getItem('user')) {
			navigate('/');
		}
	}, [navigate]);

	return (
		<div className='login-page'>
			{loading && <Spinner />} {/* Display spinner while loading */}
			<Form layout='vertical' onFinish={submitHandler}>
				<h1>Login</h1>
				<Form.Item
					label='Email'
					name='email'
					rules={[{ required: true, message: 'Please enter your email!' }]} // Validation rule
				>
					<Input type='email' />
				</Form.Item>
				<Form.Item
					label='Password'
					name='password'
					rules={[{ required: true, message: 'Please enter your password!' }]} // Validation rule
				>
					<Input.Password />
				</Form.Item>
				<div className='d-flex justify-content-between'>
					<Link to='/register'>Not a User? Click Here to Register</Link>
					<button className='btn btn-primary' type='submit'>
						Login
					</button>{' '}
					{/* Set type to submit */}
				</div>
			</Form>
		</div>
	);
};

export default Login;
