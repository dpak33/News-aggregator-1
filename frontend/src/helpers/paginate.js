export function paginate(array, pageSize, pageNumber) {
    // calculate total pages
    const totalPages = Math.ceil(array.length / pageSize);

    // calculate start and end item indexes
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, array.length - 1);

    // create an array of items to be returned for the current page
    const pageItems = array.slice(startIndex, endIndex + 1);

    return {
        totalPages,
        pageItems
    };
}






