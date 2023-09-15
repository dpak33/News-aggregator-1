const { fetchArticles, transformAndSaveArticles, fetchSavedAndLikedArticles, deleteOldArticles } = require('../../backendhelpers/forAPIcalls');
const axios = require('axios');
jest.mock('axios');

axios.get.mockResolvedValue({ data: { news: [], results: [], response: { results: [] } } });

describe('fetchArticles', () => {
    it('should fetch articles from APIs without errors', async () => {
        const articles = await fetchArticles();

        // Here, you're just checking if the function runs without errors and returns an array.
        // You can add more assertions as needed.
        expect(Array.isArray(articles)).toBe(true);
        expect(axios.get).toHaveBeenCalledTimes(3);
    });
});