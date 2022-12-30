// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKy0Npko2A2zbjHhWOaeCcBuGjDZXYAEM",
  authDomain: "at-pro.firebaseapp.com",
  projectId: "at-pro",
  storageBucket: "at-pro.appspot.com",
  messagingSenderId: "343748301972",
  appId: "1:343748301972:web:f590e2eac6980b6fe05081",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
