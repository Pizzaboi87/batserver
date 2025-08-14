const express = require("express");
const router = express.Router();
const games = require("../services/batServerGames");

router.get("/", async (req, res) => {
  try {
    const page = req.query.page;
    const data = await games.getGames(page);
    return res.json(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("Error while getting games", {
      name: err?.name,
      message: err?.message,
      code: err?.code,
      errno: err?.errno,
      sqlState: err?.sqlState,
      stack: err?.stack,
    });
    return res.status(500).json({
      error: "Failed to fetch games",
      reason: err?.message || "unknown",
    });
  }
});

module.exports = router;
