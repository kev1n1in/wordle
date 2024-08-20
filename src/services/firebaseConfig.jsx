
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDUaO5zr_GLIBfSQMWIzftXVi_si22jVb4",
  authDomain: "wordle-9ca2c.firebaseapp.com",
  projectId: "wordle-9ca2c",
  storageBucket: "wordle-9ca2c.appspot.com",
  messagingSenderId: "480502120346",
  appId: "1:480502120346:web:f2fb903644b334fc7e4423"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };