const express = require("express");
const router = express.Router();
const movies = require("../services/batServerMovies");

router.get("/", async (req, res) => {
  try {
    const page = req.query.page;
    const data = await movies.getMovies(page);
    return res.json(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("Error while getting movies", {
      name: err?.name,
      message: err?.message,
      code: err?.code,
      errno: err?.errno,
      sqlState: err?.sqlState,
      stack: err?.stack,
    });
    return res.status(500).json({
      error: "Failed to fetch movies",
      reason: err?.message || "unknown",
    });
  }
});

module.exports = router;
