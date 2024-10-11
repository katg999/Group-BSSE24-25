import configureStore from 'redux-mock-store'; // Mock store
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import BillsPage from './BillsPage'; // Assuming you're testing this component

const mockStore = configureStore([]);

test('renders without crashing', () => {
    const store = mockStore({
        cart: { cartItems: [] }, // mock the state structure your component expects
    });

    render(
        <Provider store={store}>
            <MemoryRouter>
                <BillsPage />
            </MemoryRouter>
        </Provider>
    );
});
