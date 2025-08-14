require("dotenv").config();
const express = require("express");
const cors = require("cors");
const config = require("./config");
const moviesRouter = require("./routes/batServerMovies");
const gamesRouter = require("./routes/batServerGames");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3001",
      "https://weiser-batman.netlify.app",
    ],
  })
);
app.use(express.json());

app.get("/", (_req, res) => res.json({ message: "ok" }));

app.use("/movies", moviesRouter);
app.use("/games", gamesRouter);

app.use((err, _req, res, _next) => {
  if (res.headersSent) return;
  console.error("[Global error handler]", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(config.server.port, () => {
  console.log(`Server listening on port ${config.server.port}`);
});
