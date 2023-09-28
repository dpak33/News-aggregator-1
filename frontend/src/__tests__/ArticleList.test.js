import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import ArticleList from '../helpers/ArticleList'; // Adjust the import as per your directory structure

// Mocking the axios module
jest.mock('axios');

describe('ArticleList Component', () => {
    const mockArticles = [
        { title: 'Test Article 1', content: 'Test Content 1' },
        { title: 'Test Article 2', content: 'Test Content 2' }
    ];

    it('fetches and displays articles', async () => {
        axios.get.mockResolvedValue({ data: mockArticles });

        render(
            <MemoryRouter>
                <ArticleList route="/test-route" pageTitle="Test Page" />
            </MemoryRouter>
        );

        // Assuming that the Article component renders the article title
        await waitFor(() => expect(screen.getByText('Test Article 1')).toBeInTheDocument());
        expect(screen.getByText('Test Article 2')).toBeInTheDocument();
    });

    it('does not fetch articles if userId is an empty string', async () => {
        const fetchConfig = { params: { userId: '' } };

        render(
            <MemoryRouter>
                <ArticleList route="/test-route" pageTitle="Test Page" fetchConfig={fetchConfig} />
            </MemoryRouter>
        );

        expect(axios.get).not.toHaveBeenCalled();
    });

    it('fetch articles with different route prop', async () => {
        axios.get.mockResolvedValue({ data: mockArticles });

        render(
            <MemoryRouter>
                <ArticleList route="/different-route" pageTitle="Test Page" />
            </MemoryRouter>
        );

        expect(axios.get).toHaveBeenCalledWith('/different-route', {});
    });
});