import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDbLTdwvKMuD8jkXEGgvRuq6PvCkfMBn0w",
  authDomain: "react-tutorial-e434b.firebaseapp.com",
  projectId: "react-tutorial-e434b",
  storageBucket: "react-tutorial-e434b.appspot.com",
  messagingSenderId: "93734848819",
  appId: "1:93734848819:web:268a6617a7edde56975646",
  measurementId: "G-RSLER6R3LH",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
