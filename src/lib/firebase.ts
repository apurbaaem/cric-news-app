// firebase/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBlI065mncZGTkX3tns8K1-7_vUTSgnMHw",
  authDomain: "crick-app-6ecc3.firebaseapp.com",
  projectId: "crick-app-6ecc3",
  storageBucket: "crick-app-6ecc3.appspot.com", // ✅ Corrected
  messagingSenderId: "16927626193",
  appId: "1:16927626193:web:31efc4d124a3d68c3bc6f0",
  measurementId: "G-V5G2BCX553"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
