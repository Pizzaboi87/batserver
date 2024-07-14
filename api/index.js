require("dotenv").config();

const express = require("express");
const app = express();
const batMovies = require("../routes/batServerMovies");
const batGames = require("../routes/batServerGames");
const comicVine = require("../routes/comicVine");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/movies", batMovies);
app.use("/games", batGames);
app.use("/comicvine", comicVine);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
