const express = require("express");
const router = express.Router();
const cors = require("cors");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const url = process.env.API_URL;
const key = process.env.API_KEY;

router.use(cors());

router.get("/:type/:character/:filter", async (req, res, next) => {
  const { type, character, filter } = req.params;

  if (!url || !key) {
    res.status(500).json({ message: "API URL or key is missing." });
    return;
  }

  try {
    const response = await fetch(
      `${url}/${type}/${character}?api_key=${key}&format=json&${filter}`
    );

    if (!response.ok) {
      throw new Error(
        `ComicVine API request failed with status ${response.status}`
      );
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from ComicVine API:", error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
