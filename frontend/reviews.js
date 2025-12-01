import { db, collection, getDocs } from "./firebaseAuth.js";

/* ---------------------------------------------------------
   DOM ELEMENTS
--------------------------------------------------------- */
const gameSelect = document.getElementById("game-select");
const reviewsContainer = document.getElementById("reviewsContainer");
const gameInfoBox = document.getElementById("game-info");
const selectedGameName = document.getElementById("selectedGameName");
const averageRatingBox = document.getElementById("averageRating"); // optional
const totalReviewsBox = document.getElementById("totalReviews");   // optional
const sortSelect = document.getElementById("sortReviews");         // optional

let currentGame = null;

/* ---------------------------------------------------------
   INITIALIZATION
--------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", async () => {
  await loadGames();
  const firstGame = gameSelect?.value;
  if (firstGame) selectGame(firstGame);

  // Sorting listener
  if (sortSelect) {
    sortSelect.addEventListener("change", () => loadReviews(currentGame));
  }

  if (gameSelect) {
    gameSelect.addEventListener("change", () => selectGame(gameSelect.value));
  }
});

/* ---------------------------------------------------------
   LOAD GAMES INTO DROPDOWN
--------------------------------------------------------- */
async function loadGames() {
  if (!gameSelect) return;

  try {
    const res = await fetch("http://localhost:3000/games");
    const games = await res.json();

    gameSelect.innerHTML = '<option disabled selected>Select a game</option>';

    games.forEach(game => {
      const opt = document.createElement("option");
      opt.value = game.title;
      opt.textContent = game.title;
      gameSelect.appendChild(opt);
    });

    if (games.length > 0) gameSelect.selectedIndex = 1;
  } catch (err) {
    console.error(err);
    gameSelect.innerHTML = '<option>Failed to load games</option>';
  }
}

/* ---------------------------------------------------------
   SELECT GAME
--------------------------------------------------------- */
async function selectGame(title) {
  currentGame = title;
  if (selectedGameName) selectedGameName.textContent = title;

  await loadGameDetails(title);
  await loadReviews(title);
}

/* ---------------------------------------------------------
   LOAD SELECTED GAME INFO
--------------------------------------------------------- */
async function loadGameDetails(title) {
  if (!gameInfoBox) return;

  try {
    const res = await fetch("http://localhost:3000/games");
    const games = await res.json();
    const game = games.find(g => g.title === title);

    if (!game) {
      gameInfoBox.innerHTML = "";
      return;
    }

    gameInfoBox.innerHTML = `
      <h3>${game.title}</h3>
      <p><strong>Release Date:</strong> ${game.releaseDate}</p>
      <p><strong>Status:</strong> ${game.status}</p>
      <p><strong>Developer:</strong> ${game.developer}</p>
      <p><strong>Publisher:</strong> ${game.publisher}</p>
      <p><strong>Platforms:</strong> ${game.platforms.join(", ")}</p>
    `;
  } catch (err) {
    console.error("Failed to load game details:", err);
    gameInfoBox.innerHTML = "<p>Unable to load game information.</p>";
  }
}

/* ---------------------------------------------------------
   LOAD REVIEWS & AVERAGE RATING
--------------------------------------------------------- */
async function loadReviews(gameFilter = null) {
  if (!reviewsContainer) return;
  reviewsContainer.innerHTML = "Loading reviews...";

  try {
    const snapshot = await getDocs(collection(db, "reviews"));
    reviewsContainer.innerHTML = "";

    let reviews = [];
    snapshot.forEach(doc => {
      const r = doc.data();
      if (gameFilter && r.game !== gameFilter) return;
      reviews.push(r);
    });

    if (!reviews.length) {
      reviewsContainer.innerHTML = "<p>No reviews yet.</p>";
      if (averageRatingBox) averageRatingBox.textContent = "Average Rating: N/A";
      if (totalReviewsBox) totalReviewsBox.textContent = "Total Reviews: 0";
      return;
    }

    // Sorting
    const sortValue = sortSelect?.value || "newest";
    if (sortValue === "newest") reviews.sort((a, b) => b.timestamp - a.timestamp);
    else if (sortValue === "oldest") reviews.sort((a, b) => a.timestamp - b.timestamp);
    else if (sortValue === "highest") reviews.sort((a, b) => b.rating - a.rating);
    else if (sortValue === "lowest") reviews.sort((a, b) => a.rating - b.rating);

    // Calculate average rating
    const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

    if (averageRatingBox) averageRatingBox.textContent = `Average Rating: ${avgRating} / 5`;
    if (totalReviewsBox) totalReviewsBox.textContent = `Total Reviews: ${reviews.length}`;

    // Render reviews
    reviews.forEach(r => {
      const div = document.createElement("div");
      div.classList.add("review-item");
      div.innerHTML = `
        <strong>${r.username}</strong>
        <span>${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</span>
        <p>${r.text}</p>
      `;
      reviewsContainer.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    reviewsContainer.innerHTML = "<p>Failed to load reviews.</p>";
  }
}
