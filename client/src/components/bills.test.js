import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';  // make sure it's from react-dom/test-utils for proper handling of hooks
import BillsPage from '../pages/BillsPage';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureStore([]);

describe('BillsPage Component', () => {
	let store;

	beforeEach(() => {
		store = mockStore({
			// Mock any necessary store states here, for example:
			loading: false,
		});
	});

	test('renders the table with no data', async () => {
		await act(async () => {
			render(
				<Provider store={store}>
					<MemoryRouter>
						<BillsPage />
					</MemoryRouter>
				</Provider>
			);
		});

		const invoiceHeader = screen.getByText(/invoice list/i);
		expect(invoiceHeader).toBeInTheDocument();

		const table = screen.getByRole('table');
		expect(table).toBeInTheDocument();
	});
});
