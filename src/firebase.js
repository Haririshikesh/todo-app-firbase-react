// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjQVJG9QSn3ZUPrSw5R8ppOyxA_Fa18UA",
  authDomain: "esha-todoreactfb.firebaseapp.com",
  projectId: "esha-todoreactfb",
  storageBucket: "esha-todoreactfb.appspot.com",
  messagingSenderId: "1094545519429",
  appId: "1:1094545519429:web:a8b3b78a021b5c2e4bc42c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)