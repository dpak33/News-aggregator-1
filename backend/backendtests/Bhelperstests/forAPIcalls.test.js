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

    it('should fetch articles from Currents API correctly', async () => {
        await fetchArticles();

        // Assertions related to the Currents API, for example:
        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('currentsapi'));
    });

    it('should deal with the correct response object structure for each API call', async () => {
        const mockCurrentsResponse = { data: { news: ['currentsArticle1', 'currentsArticle2'] } };
        const mockNYTimesResponse = { data: { results: ['nyTimesArticle1', 'nyTimesArticle2'] } };
        const mockGuardianResponse = { data: { response: { results: ['guardianArticle1', 'guardianArticle2'] } } };

        axios.get.mockImplementation((url) => {
            if (url.includes('currentsapi')) return Promise.resolve(mockCurrentsResponse);
            if (url.includes('nytimes')) return Promise.resolve(mockNYTimesResponse);
            if (url.includes('guardianapis')) return Promise.resolve(mockGuardianResponse);
            return Promise.reject(new Error('URL not recognized'));
        });

        await fetchArticles(); // call fetchArticles to trigger the axios.get mock.

        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('currentsapi'));
        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('nytimes'));
        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('guardianapis'));
    });

    it('should correctly combine and transform articles from all APIs', async () => {
        const mockCurrentsResponse = { data: { news: ['currentsArticle1', 'currentsArticle2'] } };
        const mockNYTimesResponse = { data: { results: ['nyTimesArticle1', 'nyTimesArticle2'] } };
        const mockGuardianResponse = { data: { response: { results: ['guardianArticle1', 'guardianArticle2'] } } };

        axios.get.mockImplementation((url) => {
            if (url.includes('currentsapi')) return Promise.resolve(mockCurrentsResponse);
            if (url.includes('nytimes')) return Promise.resolve(mockNYTimesResponse);
            if (url.includes('guardianapis')) return Promise.resolve(mockGuardianResponse);
            return Promise.reject(new Error('URL not recognized'));
        });

        const articles = await fetchArticles();

        // Check if all articles are in the response
        expect(articles).toEqual(expect.arrayContaining(['currentsArticle1', 'nyTimesArticle1', 'guardianArticle1']));
        expect(articles).toEqual(expect.arrayContaining(['currentsArticle2', 'nyTimesArticle2', 'guardianArticle2']));

    });
});

