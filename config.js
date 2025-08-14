const config = {
  db: {
    host: process.env.API_HOST,
    port: Number(process.env.API_PORT || 3306),
    user: process.env.API_USER,
    password: process.env.API_PASSWORD,
    database: process.env.API_DATABASE,
    ssl: { rejectUnauthorized: true },
  },
  listPerPage: 200,
};

module.exports = config;