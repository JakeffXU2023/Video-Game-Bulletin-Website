import { auth, db, collection, getDocs, addDoc, query, orderBy } from "./firebaseAuth.js";

// DOM Elements

document.addEventListener("DOMContentLoaded", () => {
  loadGames();
  loadReviews();
});

const gameSelect = document.getElementById("game-select");
const addReviewBtn = document.getElementById("add-review-btn");
const addReviewSection = document.getElementById("addReviewSection");
const reviewText = document.getElementById("reviewText");
const starSelector = document.getElementById("starSelector");
const submitReviewBtn = document.getElementById("submitReviewBtn");
const reviewsContainer = document.getElementById("reviewsContainer");

// User info
const username = localStorage.getItem("vgbUsername");
const role = localStorage.getItem("vgbRole") || "guest";

// Hide add-review section for guests
if (addReviewSection && role === "guest") {
  addReviewSection.style.display = "none";
}

// Load games
async function loadGames() {
  if (!gameSelect) return;

  try {
    const res = await fetch("http://localhost:3000/games");
    const games = await res.json();

    // Clear existing options
    gameSelect.innerHTML = '<option disabled selected>Select a game</option>';

    if (!games.length) {
      const opt = document.createElement("option");
      opt.textContent = "No games available";
      gameSelect.appendChild(opt);
      return;
    }

    games.forEach(game => {
      const opt = document.createElement("option");
      opt.value = game.title;
      opt.textContent = game.title;
      gameSelect.appendChild(opt);
    });

    // Set first real game as selected by default
    gameSelect.selectedIndex = 1;

  } catch (err) {
    console.error(err);
    const opt = document.createElement("option");
    opt.textContent = "Failed to load games";
    gameSelect.appendChild(opt);
  }
}


// Star rating
let selectedRating = 0;
if (starSelector) {
  starSelector.addEventListener("click", e => {
    if (!e.target.dataset.value) return;
    selectedRating = parseInt(e.target.dataset.value);
    Array.from(starSelector.children).forEach(span => {
      span.style.color = span.dataset.value <= selectedRating ? "gold" : "gray";
    });
  });
}

// Add review button
if (addReviewBtn && addReviewSection) {
  addReviewBtn.addEventListener("click", () => {
    if (role === "guest") {
      alert("You need to log in to write a review!");
    } else {
      addReviewSection.style.display = "block";
    }
  });
}

// Submit review
if (submitReviewBtn) {
  submitReviewBtn.addEventListener("click", async () => {
    if (!gameSelect || !reviewText) return;

    const game = gameSelect.value;
    const text = reviewText.value.trim();
    if (!game || !text || !selectedRating) return alert("Select a game, give a rating, and write your review!");

    try {
      await addDoc(collection(db, "reviews"), {
        username,
        game,
        rating: selectedRating,
        text,
        timestamp: Date.now()
      });

      alert("Review submitted!");
      reviewText.value = "";
      selectedRating = 0;
      if (starSelector) Array.from(starSelector.children).forEach(span => span.style.color = "gray");

      loadReviews(game); // Refresh reviews
    } catch (err) {
      console.error(err);
      alert("Failed to submit review.");
    }
  });
}

// Load reviews
async function loadReviews(gameFilter = null) {
  if (!reviewsContainer) return;

  reviewsContainer.innerHTML = "Loading reviews...";

  try {
    let q = collection(db, "reviews");
    const snapshot = await getDocs(q);
    reviewsContainer.innerHTML = "";

    snapshot.forEach(doc => {
  const r = doc.data();
  if (gameFilter && r.game !== gameFilter) return;

  const div = document.createElement("div");
  div.classList.add("review-item");
  div.innerHTML = `
    <h4 class="review-game">${r.game}</h4>
    <strong class="review-username">${r.username}</strong> 
    <span class="review-stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</span>
    <p class="review-text">${r.text}</p>
  `;
  reviewsContainer.appendChild(div);
});


  } catch (err) {
    console.error(err);
    reviewsContainer.innerHTML = "<p>Failed to load reviews.</p>";
  }
}

//show game name when selected
const selectedGameName = document.getElementById("selectedGameName");

if (gameSelect && selectedGameName) {
  gameSelect.addEventListener("change", () => {
    loadReviews(gameSelect.value);
    selectedGameName.textContent = gameSelect.value;
  });

  // Set initial label
  if (gameSelect.value && gameSelect.selectedIndex > 0) {
    selectedGameName.textContent = gameSelect.value;
  }
}


// Event listener for game selection
if (gameSelect) {
  gameSelect.addEventListener("change", () => {
    loadReviews(gameSelect.value);
  });
}

// Initial load
loadGames();
loadReviews();
