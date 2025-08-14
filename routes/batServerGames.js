const express = require("express");
const router = express.Router();
const cors = require("cors");
const batServer = require("../services/batServerGames");

router.use(cors());

router.get("/", async (req, res, next) => {
  try {
    const result = await batServer.getGames(req.query.page);
    return res.json(result);
  } catch (err) {
    console.log("Error while getting batServer data", err.message);
    return next(err);
  }
});

module.exports = router;
