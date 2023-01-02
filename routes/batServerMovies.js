const express = require('express');
const router = express.Router();
const batServer = require('../services/batServerMovies');

router.get('/', async function(req, res, next) {
    try {
        res.json(await batServer.getMultiple(req.query.page));
    } catch (err) {
        console.log(`Error while getting batServer data `, err.message);
        next(err);
    }
});

module.exports = router;