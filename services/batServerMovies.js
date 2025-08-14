const db = require("./db");

const getMovies = async (page = 1, perPage = 200) => {
  const currentPage = Math.max(
    1,
    Number.isFinite(+page) ? parseInt(page, 10) : 1
  );
  const limit = Math.max(
    1,
    Number.isFinite(+perPage) ? parseInt(perPage, 10) : 200
  );
  const offset = (currentPage - 1) * limit;

  const sql = `
    SELECT
      id,
      title,
      shown AS year,
      runtime,
      director,
      actors,
      plot,
      poster AS poster_url,
      imdbRating AS imdb_rating,
      imdbID AS imdb_id,
      filmType AS film_type
    FROM batMovie
    ORDER BY CAST(shown AS UNSIGNED) DESC, id DESC
    LIMIT ?, ?
  `;

  const rows = await db.query(sql, [offset, limit]);
  return rows;
};

module.exports = { getMovies };
