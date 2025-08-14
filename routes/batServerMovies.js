const express = require('express');
const router = express.Router();
const cors = require('cors');
const batServer = require('../services/batServerMovies');

router.use(cors());

router.get('/', async (req, res, next) => {
  try {
    const page = req.query.page;
    const data = await batServer.getMovies(page);
    res.json(data);
  } catch (err) {
    console.log('Error while getting movies', err);
    res.status(500).json({ error: 'Failed to fetch movies' });
    next(err);
  }
});

module.exports = router;
