// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-1ba72.firebaseapp.com",
  projectId: "mern-estate-1ba72",
  storageBucket: "mern-estate-1ba72.appspot.com",
  messagingSenderId: "513066569587",
  appId: "1:513066569587:web:50d95a9e59f003359c7f06"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);