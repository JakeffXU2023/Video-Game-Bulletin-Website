// calendar.js

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let releases = {}; // key: "YYYY-MM-DD", value: array of game objects

// Fetch releases from API
async function loadReleases() {
  try {
    const res = await fetch("http://localhost:3000/games");
    const games = await res.json();

    // Sort by releaseDate
    games.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));

    // Map releases to their day
    games.forEach(game => {
      if (!game.releaseDate) return;
      const dateKey = game.releaseDate; // format: YYYY-MM-DD
      if (!releases[dateKey]) releases[dateKey] = [];
      releases[dateKey].push(game); // store full object
    });

    console.log("Loaded releases:", releases);
  } catch (err) {
    console.error("Error fetching releases:", err);
  }
}

// Generate calendar for a month
function generateCalendar(year, month) {
  const calendar = document.getElementById("calendar");
  const monthYear = document.getElementById("month-year");
  if (!calendar || !monthYear) return;

  calendar.innerHTML = "";

  // Month header
  const monthName = new Date(year, month).toLocaleString("default", { month: "long" });
  monthYear.textContent = `${monthName} ${year}`;

  // Day headers
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  days.forEach(day => {
    const header = document.createElement("div");
    header.className = "day header";
    header.textContent = day;
    calendar.appendChild(header);
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Empty leading cells
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    empty.className = "day empty";
    calendar.appendChild(empty);
  }

  // Days
  for (let d = 1; d <= daysInMonth; d++) {
    const cell = document.createElement("div");
    cell.className = "day";
    cell.textContent = d;

    const dateKey = `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;

    // Highlight today
    if (d === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      cell.classList.add("today");
    }

    // Show release dot if any game is on that day
    if (releases[dateKey]) {
      cell.classList.add("has-release");
      const dot = document.createElement("span");
      dot.className = "release-dot";
      cell.appendChild(dot);

      cell.addEventListener("click", () => showReleasePanel(dateKey));
    }

    calendar.appendChild(cell);
  }
}

// Show release panel
function showReleasePanel(dateKey) {
  const panel = document.getElementById("release-panel");
  const content = document.getElementById("panel-content");
  const panelDate = document.getElementById("panel-date");

  if (!panel || !content || !panelDate) return;

  panelDate.textContent = `Releases on ${dateKey}`;
  content.innerHTML = "";

  releases[dateKey].forEach(game => {
    const div = document.createElement("div");
    div.className = "game";
    div.innerHTML = `
      <strong>${game.title}</strong>
      <p>Developer: ${game.developer || "Unknown"}</p>
      <p>Publisher: ${game.publisher || "Unknown"}</p>
      <p>Status: ${game.status || "TBA"}</p>
    `;
    content.appendChild(div);
  });

  panel.classList.remove("hidden");
}

// Navigation
function prevMonth() {
  currentMonth--;
  if (currentMonth < 0) { currentMonth = 11; currentYear--; }
  generateCalendar(currentYear, currentMonth);
}

function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) { currentMonth = 0; currentYear++; }
  generateCalendar(currentYear, currentMonth);
}

// Init calendar
export async function initCalendar() {
  await loadReleases();
  generateCalendar(currentYear, currentMonth);

  // Bind buttons globally
  window.prevMonth = prevMonth;
  window.nextMonth = nextMonth;

  // Panel controls
  const panel = document.getElementById("release-panel");
  const closeBtn = document.getElementById("close-panel");
  const panelContent = panel?.querySelector(".release-panel-content");

  if (closeBtn) {
    closeBtn.addEventListener("click", () => panel.classList.add("hidden"));
  }

  if (panel) {
    // Close if click outside content
    panel.addEventListener("click", e => { if (e.target === panel) panel.classList.add("hidden"); });
  }

  // Prevent panel clicks from closing
  panelContent?.addEventListener("click", e => e.stopPropagation());
}
