const db = require("./db");
const helper = require("../helper");
const config = require("../config");

const getMovies = async (page = 1) => {
  const offset = helper.getOffset(page, config.listPerPage);

  const sql = `
    SELECT 
      title, shown, runtime, director, actors, plot, poster, imdbRating, imdbID, filmType
    FROM batMovie
    LIMIT ?, ?
  `;

  const rows = await db.query(sql, [offset, config.listPerPage]);
  const data = helper.emptyOrRows(rows);
  const meta = { page: Math.max(1, parseInt(page, 10) || 1) };

  return { data, meta };
};

module.exports = { getMovies };
