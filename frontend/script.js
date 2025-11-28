console.log("Video Game Bulletin loaded");

document.addEventListener("DOMContentLoaded", () => {


  // --- Role-Based Redirect ---


  /* =========================
     FEATURED GAMES LOADING (Firebase)
     ========================= */
  async function loadFeaturedGames() {
  try {
    const res = await fetch("http://localhost:3000/games");
    const games = await res.json();
    console.log("Games fetched:", games); // DEBUG

   games.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));

    const grid = document.querySelector(".game-grid");
    if (!grid) return; // <-- SAFETY CHECK: exit if no grid on this page

    grid.innerHTML = ""; 

    if (!games.length) {
      grid.innerHTML = "<p>No games found.</p>";
      return;
    }

    games.forEach((g, i) => {
      const div = document.createElement("div");
      div.classList.add("game");
      div.innerHTML = `<h4>${g.title || "Game " + (i+1)}</h4>
                       <p>Release: ${g.releaseDate || "TBA"}</p>`;
      grid.appendChild(div);
    });

  } catch (err) {
    console.error(err);
    document.querySelector(".game-grid").innerHTML = "<p>Error loading games.</p>";
  }
  }

  loadFeaturedGames();
});
