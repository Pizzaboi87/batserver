const getOffset = (currentPage = 1, listPerPage) => {
  return (Number(currentPage || 1) - 1) * Number(listPerPage || 0);
};

const emptyOrRows = (rows) => {
  if (!rows) return [];
  return rows;
};

module.exports = {
  getOffset,
  emptyOrRows,
};
