import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";

// --- Firebase Auth ---
import { getAuth } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// --- Firestore ---
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit 
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBZYj7_mAMVkMawvOqX34d_y01ekvdBJMc",
  authDomain: "video-game-bulletin.firebaseapp.com",
  databaseURL: "https://video-game-bulletin-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "video-game-bulletin",
  storageBucket: "video-game-bulletin.firebasestorage.app",
  messagingSenderId: "1031804164200",
  appId: "1:1031804164200:web:5c937b7b173ed64797c3dd",
  measurementId: "G-HNKSMG8QF8"
};

// --- Init ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export everything Firestore needs
export {
  auth,
  db,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit
};