import { render } from '@testing-library/react'; 
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

	test('renders without crashing', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<BillsPage />
				</MemoryRouter>
			</Provider>
		);
		// No assertions, just ensuring the render doesn't throw any errors
	});
});
