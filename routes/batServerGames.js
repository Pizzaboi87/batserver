const express = require('express');
const mysql = require('mysql2/promise');
const router = express.Router();
const cors = require('cors')
const batServer = require('../services/batServerGames');

router.use(cors())

router.get('/', async function(req, res, next) {
    try {
        res.json(await batServer.getGames(req.query.page));
    } catch (err) {
        console.log(`Error while getting batServer data `, err.message);
        next(err);
    } finally {
        mysql.end();
    }
});

module.exports = router;