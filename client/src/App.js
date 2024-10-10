import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import BillsPage from './pages/BillsPage.js';
import CartPage from './pages/CartPage.js';
import CustomerPage from './pages/CustomerPage.js';
import Homepage from './pages/Homepage.js';
import ItemPage from './pages/ItemPage.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={
							<ProtectedRoute>
								<Homepage />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/items'
						element={
							<ProtectedRoute>
								<ItemPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/cart'
						element={
							<ProtectedRoute>
								<CartPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/bills'
						element={
							<ProtectedRoute>
								<BillsPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/customers'
						element={
							<ProtectedRoute>
								<CustomerPage />
							</ProtectedRoute>
						}
					/>
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export function ProtectedRoute({ children }) {
	if (localStorage.getItem('user')) {
		return children;
	} else {
		return <Navigate to='/login' />;
	}
}

export default App;
