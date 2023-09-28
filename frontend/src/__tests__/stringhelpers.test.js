import { truncateText, getFirstXWords } from '../helpers/stringhelpers';

describe('truncateText', () => {

    test('should truncate text if it is longer than the specified length', () => {
        const input = "This is a long text string that needs to be truncated";
        const output = truncateText(input, 20);
        expect(output.length).toBeLessThanOrEqual(23); // 20 characters + 3 dots
        expect(output).toBe("This is a long text ...");
    });

    test('should not truncate text if it is shorter than the specified length', () => {
        const input = "Short text";
        const output = truncateText(input, 20);
        expect(output).toBe("Short text");
    });

    test('should return the text as is if it is equal to the specified length', () => {
        const input = "Exactly twenty chars";
        const output = truncateText(input, 20);
        expect(output).toBe("Exactly twenty chars");
    });
});

describe('getFirstXWords', () => {

    test('should return the first x words of the text', () => {
        const input = "This is a sentence containing multiple words";
        const output = getFirstXWords(input, 3);
        expect(output).toBe("This is a");
    });

    test('should return the entire text if x is greater than the number of words in the text', () => {
        const input = "Short sentence";
        const output = getFirstXWords(input, 5);
        expect(output).toBe("Short sentence");
    });

    test('should return an empty string if x is 0', () => {
        const input = "Does not matter";
        const output = getFirstXWords(input, 0);
        expect(output).toBe("");
    });
});




