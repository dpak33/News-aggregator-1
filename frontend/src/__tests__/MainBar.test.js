import React from 'react';
import axios from 'axios';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainBar from '../components/MainBar';

// Mocking axios get request
jest.mock('axios');

// Sample articles to be used for testing
const articles = [
    { title: 'Article 1', image: 'image1.png' },
    { title: 'Article 2', image: 'image2.png' },
];

describe('MainBar Component', () => {
    it('should render fetched articles', async () => {
        axios.get.mockResolvedValue({ data: articles });
        render(<MainBar />);
        await waitFor(() => screen.getByAltText('Article 1'));

        expect(screen.getByAltText('Article 1')).toBeInTheDocument();
        expect(screen.getByAltText('Article 2')).toBeInTheDocument();
    });

    it('should display title of hovered article', async () => {
        axios.get.mockResolvedValue({ data: articles });
        render(<MainBar />);
        await waitFor(() => screen.getByAltText('Article 1'));

        fireEvent.mouseEnter(screen.getByAltText('Article 1'));
        expect(screen.getByText('Article 1')).toBeInTheDocument();

        fireEvent.mouseLeave(screen.getByAltText('Article 1'));
        expect(screen.queryByText('Article 1')).toBeNull();
    });

    it('should handle image error correctly', async () => {
        axios.get.mockResolvedValue({ data: articles });
        render(<MainBar />);
        await waitFor(() => screen.getByAltText('Article 1'));

        // Triggering error event manually
        fireEvent.error(screen.getByAltText('Article 1'));

        const altImage = 'Alt-image.jpeg';
        expect(screen.getByAltText('Article 1')).toHaveAttribute('src', altImage);
    });
});