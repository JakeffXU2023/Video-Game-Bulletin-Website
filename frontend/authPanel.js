// authPanel.js
import { auth, db, doc, setDoc, getDoc } from "./firebaseAuth.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } 
       from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

export function initAuthPanel() {
  // Inject modal HTML only once
  if (!document.getElementById("authModal")) {
    const modalHTML = `
      <div id="authModal" class="auth-modal hidden">
        <div class="auth-modal-content">
          <span id="closeAuthModal" class="close-btn">&times;</span>
          <h2 id="authTitle">Log In</h2>
          <form id="authForm">
            <div id="authError" class="error-message hidden"></div>
            <label for="authEmail">Email:</label>
            <input type="email" id="authEmail" placeholder="Enter your email" required>
            <label for="authPassword">Password:</label>
            <input type="password" id="authPassword" placeholder="Enter your password" required>
            <label for="authUsername" id="usernameLabel" class="hidden">Username:</label>
            <input type="text" id="authUsername" class="hidden" placeholder="Enter your username">
            <button type="submit" id="authSubmit">Log In</button>
          </form>
          <p id="switchAuthText">Don't have an account? <span id="switchAuth" class="switch-link">Sign Up</span></p>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHTML);
  }

  // DOM elements
  const loginBtn = document.querySelector(".login");
  const signupBtn = document.querySelector(".signup");
  const modal = document.getElementById("authModal");
  const closeBtn = document.getElementById("closeAuthModal");
  const authTitle = document.getElementById("authTitle");
  const usernameLabel = document.getElementById("usernameLabel");
  const authUsername = document.getElementById("authUsername");
  const authForm = document.getElementById("authForm");
  const authSubmit = document.getElementById("authSubmit");
  const switchAuthText = document.getElementById("switchAuthText");
  const authError = document.getElementById("authError");

  let isLogin = true;

  // Open modal
  function openModal(loginMode = true) {
    isLogin = loginMode;
    modal.classList.remove("hidden");
    authTitle.textContent = isLogin ? "Log In" : "Sign Up";
    authSubmit.textContent = isLogin ? "Log In" : "Sign Up";
    usernameLabel.classList.toggle("hidden", isLogin);
    authUsername.classList.toggle("hidden", isLogin);
    authError.classList.add("hidden");
    authError.textContent = "";
    updateSwitchText();
  }

  // Close modal
  function closeModal() {
    modal.classList.add("hidden");
    authForm.reset();
    authError.classList.add("hidden");
    authError.textContent = "";
  }

  // Switch login/signup
  function updateSwitchText() {
    switchAuthText.innerHTML = isLogin
      ? `Don't have an account? <span id="switchAuth" class="switch-link">Sign Up</span>`
      : `Already have an account? <span id="switchAuth" class="switch-link">Log In</span>`;
    
    const switchLink = document.getElementById("switchAuth");
    switchLink.onclick = () => openModal(!isLogin);
  }

  // Button events
  loginBtn?.addEventListener("click", () => openModal(true));
  signupBtn?.addEventListener("click", () => openModal(false));
  closeBtn?.addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });

  // Form submit
  authForm.addEventListener("submit", async e => {
    e.preventDefault();
    const email = document.getElementById("authEmail").value.trim();
    const password = document.getElementById("authPassword").value.trim();
    const username = authUsername.value.trim();

    // Validate fields
    if (!email || !password || (!isLogin && !username)) {
      authError.textContent = "Please fill in all required fields.";
      authError.classList.remove("hidden");
      authError.style.color = "#ff4444";
      return;
    }

    try {
      let storedUsername;
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;
        const snapshot = await getDoc(doc(db, "users", uid));
        if (!snapshot.exists()) throw new Error("User not found");
        storedUsername = snapshot.data().username;
        authError.textContent = `Welcome back, ${storedUsername}!`;
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;
        await setDoc(doc(db, "users", uid), { username, role: "user" });
        storedUsername = username;
        authError.textContent = `Account created! Welcome, ${storedUsername}!`;
      }

      // Save username for welcome messages
      localStorage.setItem("vgbUsername", storedUsername);

      authError.classList.remove("hidden");
      authError.style.color = "#00ff00";

      // Redirect after login/signup
      setTimeout(() => {
        const currentPage = window.location.pathname.split("/").pop();
        const userPages = {
          "index.html": "user_index.html",
          "calendar.html": "user_calendar.html",
          "reviews.html": "user_reviews.html"
        };
        window.location.href = userPages[currentPage] || "user_index.html";
      }, 1200);

    } catch (err) {
      authError.textContent = err.message || "Unknown error";
      authError.style.color = "#ff4444";
      authError.classList.remove("hidden");
    }
  });

  // Initially hide username for login
  usernameLabel.classList.add("hidden");
  authUsername.classList.add("hidden");
}
