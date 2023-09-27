import React from 'react';
import axios from 'axios';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Article from '../components/Article';


jest.mock('axios');
jest.mock('react-hot-toast');

describe('Article Component', () => {
    const mockStore = configureMockStore();
    const article = {
        id: '1',
        title: 'Test Article',
        description: 'Test Description',
        url: 'http://testurl.com',
        image: 'http://testimage.com',
        likes: [],
        likesCount: 0,
    };

    const userId = '123';

    let store;

    beforeEach(() => {
        store = mockStore({
            user: {
                userId,
                savedArticles: []
            }
        });

        store.dispatch = jest.fn();

        axios.post.mockResolvedValue({});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the initial elements correctly', () => {
        const { getByText, getByRole } = render(
            <Provider store={store}>
                <Article article={article} />
            </Provider>
        );

        expect(getByText('Test Article')).toBeInTheDocument();
        expect(getByText('Test Description')).toBeInTheDocument();
        expect(getByRole('img')).toHaveAttribute('src', 'http://testimage.com');
        expect(getByText('Like')).toBeInTheDocument();
        expect(getByText('Save')).toBeInTheDocument();
    });

    it('renders correctly and likes/unlikes article', async () => {
        const { getByText, getByRole } = render(
            <Provider store={store}>
                <Article article={article} />
            </Provider>
        );

        // Assert initial render
        expect(getByText('Test Article')).toBeInTheDocument();
        expect(getByText('Test Description')).toBeInTheDocument();
        expect(getByRole('img')).toHaveAttribute('src', 'http://testimage.com');
        expect(getByText('Like')).toBeInTheDocument();
        expect(getByText('Save')).toBeInTheDocument();

        // Like the article
        fireEvent.click(getByText('Like'));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/api/likes/like/1', { userId }, expect.any(Object));
            expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'LIKE_ARTICLE', payload: article.id }));
        });

        // Assert Like state and action
        expect(getByText('Unlike')).toBeInTheDocument();

        // Unlike the article
        fireEvent.click(getByText('Unlike'));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/api/likes/unlike/1', { userId }, expect.any(Object));
            expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'UNLIKE_ARTICLE', payload: article.id }));
        });

        // Assert Unlike state and action
        expect(getByText('Like')).toBeInTheDocument();
    });

    it('saves and unsaves the article', async () => {
        const { getByText } = render(
            <Provider store={store}>
                <Article article={article} />
            </Provider>
        );

        // Assert initial render
        expect(getByText('Save')).toBeInTheDocument();

        // Save the article
        fireEvent.click(getByText('Save'));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/api/saves/save/1', { userId }, expect.any(Object));
            expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'SAVE_ARTICLE', payload: article.id }));
        });

        // Assert Save state and action
        expect(getByText('Unsave')).toBeInTheDocument();

        // Unsave the article
        fireEvent.click(getByText('Unsave'));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/api/saves/unsave/1', { userId }, expect.any(Object));
            expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'UNSAVE_ARTICLE', payload: article.id }));
        });

        // Assert Unsave state and action
        expect(getByText('Save')).toBeInTheDocument();
    });
});