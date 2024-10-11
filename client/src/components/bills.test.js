import { render, screen } from '@testing-library/react';
import BillsPage from '../pages/BillsPage';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('BillsPage Component', () => {
	let store;

	beforeEach(() => {
		store = mockStore({
			// Mock any necessary store states here, for example:
			loading: false,
		});
	});

	test('renders the table with no data', () => {
		render(
			<Provider store={store}>
				<BillsPage />
			</Provider>
		);

		const invoiceHeader = screen.getByText(/invoice list/i);
		expect(invoiceHeader).toBeInTheDocument();

		const table = screen.getByRole('table');
		expect(table).toBeInTheDocument();
	});
});
