import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import mockAxios from 'jest-mock-axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Article from '../components/Article';

const mockStore = configureMockStore([thunk]);

describe('Article component', () => {

    let store;

    beforeEach(() => {
        store = mockStore({
            user: {
                userId: 'testUserId',
                savedArticles: []
            }
        });
    });

    afterEach(() => {
        mockAxios.reset();
    });

    it('renders article data correctly', () => {
        const mockArticle = {
            id: '123',
            image: 'test-image.jpg',
            title: 'Test Title',
            description: 'Test description',
            url: 'http://testurl.com',
            likesCount: 10,
            likes: []
        };

        render(
            <Provider store={store}>
                <Article article={mockArticle} />
            </Provider>
        );

        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Test description')).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', 'test-image.jpg');
    });

    it('handles like toggle correctly', async () => {
        const mockArticle = {
            id: '123',
            likes: [],
            //... other properties
        };

        render(
            <Provider store={store}>
                <Article article={mockArticle} />
            </Provider>
        );

        fireEvent.click(screen.getByText('Like'));

        await waitFor(() => {
            // Check if axios was called correctly
            expect(mockAxios.post).toHaveBeenCalledWith(
                `http://localhost:8000/api/likes/like/${encodeURIComponent(mockArticle.id)}`,
                { userId: 'testUserId' },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('user')}`
                    }
                }
            );
        });
    });

    // Similarly, you can add more tests for unliking, saving, and unsaving behaviors.
});