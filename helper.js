const getOffset = (currentPage = 1, listPerPage) => {
  const page = Math.max(1, parseInt(currentPage, 10) || 1);
  const perPage = Math.max(1, parseInt(listPerPage, 10) || 1);
  return (page - 1) * perPage;
};

const emptyOrRows = (rows) => {
  return rows || [];
};

module.exports = {
  getOffset,
  emptyOrRows,
};
