const { fetchArticles, transformAndSaveArticles, fetchSavedAndLikedArticles, deleteOldArticles } = require('../../backendhelpers/forAPIcalls');
const { transformCurrentsArticle, transformGuardianArticle, transformNYTimesArticle } = require('../../backendhelpers/transformations');
const axios = require('axios');
const Article = require('../../schemas/ArticleSchema');
jest.mock('axios');
jest.mock('../../schemas/ArticleSchema');
jest.mock('../../backendhelpers/transformations');


Article.updateOne = jest.fn();
axios.get.mockResolvedValue({ data: { news: [], results: [], response: { results: [] } } });

beforeEach(() => {
    Article.updateOne.mockReset();
});

transformCurrentsArticle.mockReturnValue({ source: 'currents', title: 'transformedCurrentsTitle' });
transformGuardianArticle.mockReturnValue({ source: 'guardian', title: 'transformedGuardianTitle' });
transformNYTimesArticle.mockReturnValue({ source: 'nytimes', title: 'transformedNYTimesTitle' });


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

    it('should handle errors gracefully when an API call fails', async () => {
        // Mock one of the axios.get calls to reject with an error
        axios.get.mockImplementationOnce((url) => {
            if (url.includes('currentsapi')) {
                return Promise.reject(new Error('Failed to fetch from Currents API'));
            }
            return axios.get(url); // calling the actual (or other mock) method if not our specific mocked URL
        });

        try {
            await fetchArticles();
            throw new Error('fetchArticles did not throw any error'); // If fetchArticles doesn't throw an error, we throw one here to fail the test
        } catch (err) {
            expect(err.message).toBe('Failed to fetch from Currents API'); // Check that the error message matches what we expect
        }

    });

    it('should return results of a certain length depending on the number of API calls made', async () => {
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
        expect(articles.length).toBe(6);

    })

});

describe('transformAndSaveArticles', () => {

    it('should correctly transform articles based on their source', async () => {
        const mockArticles = [
            { source: 'currents', title: 'sampleCurrentsTitle' },
            { section: 'nytimes', title: 'sampleNYTimesTitle' },
            { webPublicationDate: '2023-09-12T00:00:00Z', title: 'sampleGuardianTitle' },
            { source: 'currents', title: 'sampleCurrentsTitle2' }, // Added another currents article for the example
        ];

        await transformAndSaveArticles(mockArticles);

        // Expect transform functions to be called the correct number of times

        expect(transformGuardianArticle).toHaveBeenCalledTimes(1);
        expect(transformNYTimesArticle).toHaveBeenCalledTimes(1);
        expect(transformCurrentsArticle).toHaveBeenCalledTimes(2);
    });

})
