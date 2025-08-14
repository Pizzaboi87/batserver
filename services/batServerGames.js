const db = require("./db");
const helper = require("../helper");
const config = require("../config");

const getGames = async (page = 1) => {
  const offset = helper.getOffset(page, config.listPerPage);

  const sql = `
    SELECT 
      title, developer, publisher, releaseDate, platform, youTube, details,
      logo1, logo1_title, logo1_wiki,
      logo2, logo2_title, logo2_wiki,
      logo3, logo3_title, logo3_wiki,
      logo4, logo4_title, logo4_wiki,
      logo5, logo5_title, logo5_wiki,
      logo6, logo6_title, logo6_wiki
    FROM batGame
    LIMIT ?, ?
  `;

  const rows = await db.query(sql, [offset, config.listPerPage]);
  const data = helper.emptyOrRows(rows);
  const meta = { page: Math.max(1, parseInt(page, 10) || 1) };

  return { data, meta };
};

module.exports = { getGames };
