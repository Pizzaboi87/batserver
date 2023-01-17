const express = require("express");
const app = express();
const port = 3000;
const batMovies = require("./routes/batServerMovies");
const batGames = require("./routes/batServerGames");
const comicVine = require("./routes/comicVine");

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
    return;
  });

app.listen(process.env.PORT || port)