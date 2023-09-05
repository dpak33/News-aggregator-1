
/**
 * Paginates an array of items
 * @param {Array} items - Array of items to paginate
 * @param {Number} currentPage - The current page number (starts from 1)
 * @param {Number} pageSize - The number of items per page
 * @returns {Object} - Returns an object containing paginated items and total pages
 */
const paginate = (items, currentPage, pageSize) => {
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    // Calculate the starting and ending index
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // Get the items for the current page
    const pageItems = items.slice(startIndex, endIndex + 1);

    return {
        totalItems,
        totalPages,
        pageItems,
    };
};

module.exports = {
    paginate,
};