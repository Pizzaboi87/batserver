const getOffset = (currentPage = 1, listPerPage) => {
  // Ensure numeric math - avoid accidental NaN
  return (Number(currentPage || 1) - 1) * Number(listPerPage || 0);
};

const emptyOrRows = (rows) => {
  if (!rows) return [];
  return rows;
};

module.exports = {
  getOffset,
  emptyOrRows
};
