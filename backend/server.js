import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { db } from "./firebaseAPI.js"; // Firebase config
import { ref, push, get } from "firebase/database";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("frontend")); // your HTML/JS/CSS go here

/* =========================
   ADD NEW GAME
========================= */
app.post("/add", async (req, res) => {
  try {
    const gameData = req.body;
    if (!gameData.title || !gameData.releaseDate) {
      return res.status(400).json({ message: "Missing required fields." });
    }
    await push(ref(db, "games"), gameData);
    res.status(201).json({ message: "Game added successfully!", data: gameData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   GET ALL GAMES
========================= */
app.get("/games", async (req, res) => {
  try {
    const snapshot = await get(ref(db, "games"));
    const gamesObj = snapshot.val() || {};
    const gamesArr = Object.values(gamesObj); // convert object to array
    res.json(gamesArr);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   GET UPCOMING GAMES
========================= */
app.get("/upcoming", async (req, res) => {
  try {
    const snapshot = await get(ref(db, "games"));
    const games = Object.values(snapshot.val() || {});
    const upcoming = games.filter(g => g.status === "upcoming");
    res.json(upcoming);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   GET RELEASED GAMES
========================= */
app.get("/released", async (req, res) => {
  try {
    const snapshot = await get(ref(db, "games"));
    const games = Object.values(snapshot.val() || {});
    const released = games.filter(g => g.status === "released");
    res.json(released);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   GET DELAYED GAMES
========================= */
app.get("/delayed", async (req, res) => {
  try {
    const snapshot = await get(ref(db, "games"));
    const games = Object.values(snapshot.val() || {});
    const delayed = games.filter(g => g.status === "delayed");
    res.json(delayed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   GET CANCELLED GAMES
========================= */
app.get("/cancelled", async (req, res) => {
  try {
    const snapshot = await get(ref(db, "games"));
    const games = Object.values(snapshot.val() || {});
    const cancelled = games.filter(g => g.status === "cancelled");
    res.json(cancelled);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   SERVER START
========================= */
const PORT = 3000;
app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));
