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

        expect(typeof articles).toBe('object');
        expect(articles).toHaveProperty('currentsAPI');
        expect(articles).toHaveProperty('nyTimesAPI');
        expect(articles).toHaveProperty('guardianAPI');
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
        expect(articles.currentsAPI).toEqual(expect.arrayContaining(['currentsArticle1', 'currentsArticle2']));
        expect(articles.nyTimesAPI).toEqual(expect.arrayContaining(['nyTimesArticle1', 'nyTimesArticle2']));
        expect(articles.guardianAPI).toEqual(expect.arrayContaining(['guardianArticle1', 'guardianArticle2']));

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

        expect(Array.isArray(articles.currentsAPI)).toBe(true);
        expect(articles.currentsAPI.length).toBe(2);

        expect(Array.isArray(articles.nyTimesAPI)).toBe(true);
        expect(articles.nyTimesAPI.length).toBe(2);

        expect(Array.isArray(articles.guardianAPI)).toBe(true);
        expect(articles.guardianAPI.length).toBe(2);
    });

});

describe('transformAndSaveArticles', () => {

    it('should correctly transform articles based on their source', async () => {
        const mockArticles = {
            currentsAPI: [{ source: 'currents', title: 'sampleCurrentsTitle' }, { source: 'currents', title: 'sampleCurrentsTitle2' }],
            nyTimesAPI: [{ section: 'nytimes', title: 'sampleNYTimesTitle' }],
            guardianAPI: [{ webPublicationDate: '2023-09-12T00:00:00Z', title: 'sampleGuardianTitle' }]
        };

        await transformAndSaveArticles(mockArticles);

        // Expect transform functions to be called the correct number of times
        expect(transformGuardianArticle).toHaveBeenCalledTimes(1);
        expect(transformNYTimesArticle).toHaveBeenCalledTimes(1);
        expect(transformCurrentsArticle).toHaveBeenCalledTimes(2);
    });

    it('should upsert articles into the database', async () => {
        const mockArticles = [
            { source: 'currents', title: 'sampleCurrentsTitle' },
            { section: 'nytimes', title: 'sampleNYTimesTitle' },
            { webPublicationDate: '2023-09-12T00:00:00Z', title: 'sampleGuardianTitle' },
            { source: 'currents', title: 'sampleCurrentsTitle2' }
        ];

        // Mock database interaction
        const mockUpdateOne = jest.fn();
        Article.updateOne = mockUpdateOne;

        await transformAndSaveArticles(mockArticles);

        expect(mockUpdateOne).toHaveBeenCalledTimes(4); // Since there are 4 articles
        // Optionally, you can add more expects to check if it's called with the right arguments.
    });

    it('should log an error if there is an issue updating an article', async () => {
        const mockArticles = [{ source: 'currents', title: 'sampleCurrentsTitle' }];

        // Mock database interaction to throw an error
        Article.updateOne = jest.fn(() => { throw new Error('Mock DB Error') });

        // Mock console.log for assertion
        global.console.log = jest.fn();

        await transformAndSaveArticles(mockArticles);

        expect(console.log).toHaveBeenCalledWith('Error updating article:', new Error('Mock DB Error'));
    });

})
