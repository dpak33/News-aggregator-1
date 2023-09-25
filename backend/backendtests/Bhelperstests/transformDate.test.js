const { reformatDate } = require('../../backendhelpers/transformDate');

describe('reformatDate', () => {

    it('should reformat date string when it matches the expected format', () => {
        const inputDateStr = "2023-09-20 12:00:00 +0200";
        const expectedDateStr = "2023-09-20T12:00:00+02:00";

        const result = reformatDate(inputDateStr);

        expect(result).toEqual(expectedDateStr);
    });

    it('should return the original date string when it does not match the expected format', () => {
        const inputDateStr = "2023-09-20T12:00:00+02:00";

        const result = reformatDate(inputDateStr);

        expect(result).toEqual(inputDateStr);
    });

    it('should return the original string when it is not a date string', () => {
        const inputStr = "Not a date string";

        const result = reformatDate(inputStr);

        expect(result).toEqual(inputStr);
    });

});