const express = require("express");
const router = express.Router();
const cors = require("cors");
const fetch = (...args) =>
  import("node-fetch").then(({ default: f }) => f(...args));

const url = process.env.API_URL;
const key = process.env.API_KEY;

router.use(cors());

router.get("/:type/:character/:filter", async (req, res) => {
  const { type, character, filter } = req.params;

  if (!url || !key) {
    return res.status(500).json({ message: "API URL or key is missing." });
  }

  const filterFromQuery = req.query.filter ? String(req.query.filter) : null;
  const rawFilter = filterFromQuery || filter;

  const filterPart = rawFilter ? `&${rawFilter}` : "";

  try {
    const api = `${url}/${encodeURIComponent(type)}/${encodeURIComponent(
      character
    )}?api_key=${encodeURIComponent(key)}&format=json${filterPart}`;

    const response = await fetch(api);

    if (!response.ok) {
      throw new Error(
        `ComicVine API request failed with status ${response.status}`
      );
    }

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error("Error fetching data from ComicVine API:", error.message);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
