const db = require("./db");

const getGames = async (page = 1, perPage = 200) => {
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
      title AS name,
      developer,
      publisher,
      releaseDate AS year,
      platform,
      youTube AS youtube_id,
      details,
      logo1 AS cover_url,
      logo1_title,
      logo1_wiki,
      logo2,
      logo2_title,
      logo2_wiki,
      logo3,
      logo3_title,
      logo3_wiki,
      logo4,
      logo4_title,
      logo4_wiki,
      logo5,
      logo5_title,
      logo5_wiki,
      logo6,
      logo6_title,
      logo6_wiki
    FROM batGame
    ORDER BY title ASC, id ASC
    LIMIT ?, ?
  `;

  const rows = await db.query(sql, [offset, limit]);
  return rows;
};

module.exports = { getGames };
