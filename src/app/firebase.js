// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCujYfhbsGpI5fIyHWdU1oSdKy9y3qU-c",
  authDomain: "spotifyy-50c33.firebaseapp.com",
  projectId: "spotifyy-50c33",
  storageBucket: "spotifyy-50c33.firebasestorage.app",
  messagingSenderId: "854459429803",
  appId: "1:854459429803:web:e4b0beeda063b37e9158ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };