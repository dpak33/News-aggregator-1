const reformatDate = (dateStr) => {
    const matched = dateStr.match(/(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2}) ([+-]\d{4})/);
    if (matched) {
        return `${matched[1]}T${matched[2]}${matched[3].substring(0, 3)}:${matched[3].substring(3, 5)}`;
    }
    return dateStr;
}

module.exports = {
    reformatDate
}