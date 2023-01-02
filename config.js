const config = {
    db: {
        host: process.env.API_HOST,
        user: process.env.API_USER,
        password: process.env.API_PASSWORD,
        database: process.env.API_DATABASE
    },
    listPerPage: 200,
};

module.exports = config;