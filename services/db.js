const mysql = require("mysql2/promise");
const config = require("../config");

const pool = mysql.createPool(config.db);

const query = async (sql, params = []) => {
  const [rows] = await pool.query(sql, params);
  return rows;
};

module.exports = { query, pool };
