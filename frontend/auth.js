import { auth, db, doc, setDoc, getDoc } from "./firebaseAuth.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } 
       from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Elements ---
  const loginBtn = document.querySelector(".login");
  const signupBtn = document.querySelector(".signup");
  const logoutBtn = document.querySelector(".logout");
  const welcomeSpan = document.querySelector(".welcome");

  // --- Helper: Check for unique username ---
  async function isUsernameUnique(username) {
    const snapshot = await getDoc(doc(db, "users", "usernames"));
    const taken = snapshot.exists() ? snapshot.data() : {};
    return !Object.values(taken).includes(username);
  }

  // --- Signup ---
  

  

  // --- Logout ---
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try { await signOut(auth); } catch (err) { console.warn(err); }

      localStorage.setItem("vgbRole", "guest");
      localStorage.removeItem("vgbUsername");
      alert("You have logged out.");
      window.location.href = "index.html";
    });
  }

  // --- Welcome Message ---
  const storedUsername = localStorage.getItem("vgbUsername");
  if (storedUsername && welcomeSpan) {
    welcomeSpan.textContent = `Welcome, ${storedUsername}!`;
  }
});
