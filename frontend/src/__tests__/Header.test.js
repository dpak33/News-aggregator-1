import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import Header from '../components/Header';
import { clearUserInfo } from '../store/actions/userActions';

const mockStore = configureMockStore();
const store = mockStore({});

jest.mock('react-hot-toast', () => ({
    success: jest.fn(),
}));


describe('Header Component', () => {
    it('renders correctly', () => {
        const { getByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Header />
                </BrowserRouter>
            </Provider>
        );
        expect(getByText('News Aggregator')).toBeInTheDocument();
        expect(getByText('Pakenham Productions')).toBeInTheDocument();
    });

    it('opens and closes the dropdown correctly', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Header />
                </BrowserRouter>
            </Provider>
        );
        fireEvent.click(screen.getByText('menu_open'));
        expect(screen.getByText('Login/Signup')).toBeInTheDocument();

        fireEvent.click(screen.getByText('menu_open'));
        expect(screen.queryByText('Login/Signup')).not.toBeInTheDocument();
    });

    it('renders "Logout" when user is logged in', () => {
        localStorage.setItem('user', 'testUser');
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Header />
                </BrowserRouter>
            </Provider>
        );
        fireEvent.click(screen.getByText('menu_open'));
        expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    it('renders "Login/Signup" when user is logged out', () => {
        localStorage.removeItem('user');
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Header />
                </BrowserRouter>
            </Provider>
        );
        fireEvent.click(screen.getByText('menu_open'));
        expect(screen.getByText('Login/Signup')).toBeInTheDocument();
    });

});