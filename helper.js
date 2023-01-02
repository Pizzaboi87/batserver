const getOffset = (currentPage = 1, listPerPage) => {
    return (currentPage - 1) * [listPerPage];
}

const emptyOrRows = (rows) => {
    if(!rows) {
        return [];
    }
    return rows;
}

module.exports = {
    getOffset,
    emptyOrRows
}