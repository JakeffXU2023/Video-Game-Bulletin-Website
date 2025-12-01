import { auth, db, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "./firebaseAuth.js";

/* ---------------------------------------------------------
   DOM ELEMENTS
--------------------------------------------------------- */
const gameSelect = document.getElementById("game-select");
const addReviewBtn = document.getElementById("add-review-btn") || document.getElementById("writeReviewBtn");
const addReviewSection = document.getElementById("addReviewSection");
const reviewText = document.getElementById("reviewText");
const starSelector = document.getElementById("starSelector");
const submitReviewBtn = document.getElementById("submitReviewBtn");
const reviewsContainer = document.getElementById("reviewsContainer");
const gameInfoBox = document.getElementById("game-info");
const selectedGameName = document.getElementById("selectedGameName");
const averageRatingBox = document.getElementById("averageRating"); // optional, add in HTML
const totalReviewsBox = document.getElementById("totalReviews"); // optional, add in HTML
const sortSelect = document.getElementById("sortReviews"); // optional, add in HTML

/* ---------------------------------------------------------
   USER INFO
--------------------------------------------------------- */
const username = localStorage.getItem("vgbUsername");
const role = localStorage.getItem("vgbRole") || "guest";

/* ---------------------------------------------------------
   STATE
--------------------------------------------------------- */
let selectedRating = 0;
let currentGame = null;
let editingId = null; // <--- add this to track edit state

/* ---------------------------------------------------------
   INITIAL SETUP
--------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", async () => {
  await loadGames();
  const firstGame = gameSelect?.value;
  if (firstGame) {
    selectGame(firstGame);
  }
  attachEventListeners();
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
   STAR RATING LOGIC
--------------------------------------------------------- */
function initStarRating() {
  if (!starSelector) return;

  starSelector.addEventListener("click", e => {
    if (!e.target.dataset.value) return;
    selectedRating = parseInt(e.target.dataset.value);

    Array.from(starSelector.children).forEach(span => {
      span.style.color = span.dataset.value <= selectedRating ? "gold" : "gray";
    });
  });
}

/* ---------------------------------------------------------
   ATTACH EVENT LISTENERS
--------------------------------------------------------- */
function attachEventListeners() {
  initStarRating();

  // Show review section
  if (addReviewBtn && addReviewSection) {
    addReviewBtn.addEventListener("click", () => {
      if (role === "guest") return alert("You need to log in to write a review!");
      addReviewSection.style.display = "block";
    });
  }

  // Submit review
  if (submitReviewBtn) {
    submitReviewBtn.addEventListener("click", async () => {
      const game = gameSelect?.value;
      const text = reviewText?.value.trim();

      if (!game || !text || !selectedRating) {
        return alert("Select a game, give a rating, and write your review!");
      }

      try {
        if (editingId) {
          // EDIT existing review
          await updateDoc(doc(db, "reviews", editingId), {
            text,
            rating: selectedRating,
            timestamp: Date.now()
          });
          editingId = null; // reset editing state
          alert("Review updated!");
        } else {
          // ADD new review
          await addDoc(collection(db, "reviews"), {
            username,
            game,
            rating: selectedRating,
            text,
            timestamp: Date.now()
          });
          alert("Review submitted!");
        }

        // Reset form
        reviewText.value = "";
        selectedRating = 0;
        if (starSelector) Array.from(starSelector.children).forEach(span => span.style.color = "gray");

        loadReviews(game);
      } catch (err) {
        console.error(err);
        alert("Failed to submit review.");
      }
    });
  }

  // Game selection change
  if (gameSelect) {
    gameSelect.addEventListener("change", () => selectGame(gameSelect.value));
  }

  // Sorting
  if (sortSelect) {
    sortSelect.addEventListener("change", () => loadReviews(currentGame));
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
    snapshot.forEach(d => {
      const r = d.data();
      r.id = d.id;   // <-- important for edit/delete
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
        <h4>${r.game}</h4>
        <strong>${r.username}</strong>
        <span>${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</span>
        <p>${r.text}</p>
      `;

      if (r.username === username) {
        const controls = document.createElement("div");
        controls.classList.add("review-controls");

        // --- EDIT BUTTON ---
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";

        editBtn.addEventListener("click", () => {
          // Fill form with existing review
          reviewText.value = r.text;
          selectedRating = r.rating;

          Array.from(starSelector.children).forEach(s => {
            s.style.color = s.dataset.value <= selectedRating ? "gold" : "gray";
          });

          editingId = r.id; // mark this review as being edited
        });

        // --- DELETE BUTTON ---
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", async () => {
          if (confirm("Delete this review?")) {
            await deleteDoc(doc(db, "reviews", r.id));
            loadReviews(currentGame);
          }
        });

        controls.appendChild(editBtn);
        controls.appendChild(deleteBtn);
        div.appendChild(controls);
      }

      reviewsContainer.appendChild(div);
    });

  } catch (err) {
    console.error(err);
    reviewsContainer.innerHTML = "<p>Failed to load reviews.</p>";
  }
}
