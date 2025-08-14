const express = require('express');
const router = express.Router();
const cors = require('cors');
const batServer = require('../services/batServerGames');

router.use(cors());

router.get('/', async (req, res, next) => {
  try {
    const page = req.query.page;
    const data = await batServer.getGames(page);
    res.json(data);
  } catch (err) {
    console.log('Error while getting games', err);
    res.status(500).json({ error: 'Failed to fetch games' });
    next(err);
  }
});

module.exports = router;
