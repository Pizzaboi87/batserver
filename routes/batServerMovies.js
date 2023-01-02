const express = require('express');
const router = express.Router();
const cors = require('cors')
const batServer = require('../services/batServerMovies');

router.use(cors())

router.get('/', async function(req, res, next) {
    try {
        res.json(await batServer.getMultiple(req.query.page));
    } catch (err) {
        console.log(`Error while getting batServer data `, err.message);
        next(err);
    }
});

module.exports = router;