// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDzVgz94RlzgU33RbRtZE4izW6DAoijRC8",
//   authDomain: "minifrontend-c8f04.firebaseapp.com",
//   databaseURL: "https://minifrontend-c8f04-default-rtdb.asia-southeast1.firebasedatabase.app/",
//   projectId: "minifrontend-c8f04",
//   storageBucket: "minifrontend-c8f04.firebasestorage.app",
//   messagingSenderId: "568663111517",
//   appId: "1:568663111517:web:a2776fda9e988e426b9ab4"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDzVgz94RlzgU33RbRtZE4izW6DAoijRC8",
  authDomain: "minifrontend-c8f04.firebaseapp.com",
  databaseURL: "https://minifrontend-c8f04-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "minifrontend-c8f04",
  storageBucket: "minifrontend-c8f04.firebasestorage.app",
  messagingSenderId: "568663111517",
  appId: "1:568663111517:web:1055bc863d75a5866b9ab4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const auth = getAuth(app);

export { auth, database };