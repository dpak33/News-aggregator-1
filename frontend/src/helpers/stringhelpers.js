export const truncateText = (text, length) => {
    if (text.length > length) {
        return text.slice(0, length) + '...';
    }
    return text;
};

export const getFirstXWords = (text, x) => {
    const words = text.split(" "); // Split the text into an array of words
    return words.slice(0, x).join(" "); // Take the first x words and join them back into a string
};