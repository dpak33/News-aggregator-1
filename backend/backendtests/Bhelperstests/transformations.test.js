const { transformCurrentsArticle, transformNYTimesArticle, transformGuardianArticle } = require('../../backendhelpers/transformations');
const transformDate = require('../../backendhelpers/transformDate');
global.console.error = jest.fn();
jest.mock('../../backendhelpers/transformDate');

describe('transform Guardian articles', () => {

    it('should return null and log error for invalid guardianArticle', () => {
        const result = transformGuardianArticle(null);
        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith("Invalid article data:", null);
    });

    it('should transform valid guardianArticle correctly', () => {
        const mockArticle = {
            id: "someId",
            fields: {
                headline: "someHeadline",
                byline: "someByline",
                thumbnail: "someThumbnail"
            },
            webUrl: "someUrl",
            sectionName: "someSection",
            webPublicationDate: "2023-09-20T12:00:00Z"
        };

        const expected = {
            id: "someId",
            title: "someHeadline",
            description: "someByline",
            url: "someUrl",
            author: "someByline",
            image: "someThumbnail",
            language: 'en',
            category: "someSection",
            published: new Date("2023-09-20T12:00:00Z")
        };

        const result = transformGuardianArticle(mockArticle);
        expect(result).toEqual(expected);
    });
})

describe('transform NY times articles', () => {
    it('should return null and log error for invalid nyArticle', () => {
        const result = transformNYTimesArticle(null);
        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith("Invalid article data:", null);
    });

    it('should transform valid nyArticle correctly', () => {
        const mockArticle = {
            uri: "someUri",
            title: "someTitle",
            abstract: "someAbstract",
            url: "someUrl",
            byline: "someByline",
            multimedia: [{}, { url: "someImageUrl" }],
            section: "someSection",
            published_date: "2023-09-20"
        };

        const expected = {
            id: "someUri",
            title: "someTitle",
            description: "someAbstract",
            url: "someUrl",
            author: "someByline",
            image: "someImageUrl",
            language: 'en',
            category: "someSection",
            published: new Date("2023-09-20")
        };

        const result = transformNYTimesArticle(mockArticle);
        expect(result).toEqual(expected);
    });
})

describe('transform currents article', () => {
    it('should return null and log error for invalid currentsArticle', () => {
        const result = transformCurrentsArticle(null);
        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith("Invalid article data:", null);
    });

    it('should transform valid currentsArticle correctly', () => {
        const mockArticle = {
            id: "someId",
            title: "someTitle",
            description: "someDescription",
            url: "someUrl",
            author: "someAuthor",
            image: "someImage",
            language: "en",
            category: "someCategory",
            published: "2023-09-20T12:00:00Z"
        };

        // Mock the reformatDate to return the same string it receives
        transformDate.reformatDate.mockImplementation(date => date);

        const expected = {
            id: "someId",
            title: "someTitle",
            description: "someDescription",
            url: "someUrl",
            author: "someAuthor",
            image: "someImage",
            language: "en",
            category: "someCategory",
            published: new Date("2023-09-20T12:00:00Z")
        };

        const result = transformCurrentsArticle(mockArticle);
        expect(result).toEqual(expected);
    });
})