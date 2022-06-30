// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0AhMVKdoUD_u1hz-l-HyIKaxXl7p_2Bo",
  authDomain: "billing-system-e57ad.firebaseapp.com",
  projectId: "billing-system-e57ad",
  storageBucket: "billing-system-e57ad.appspot.com",
  messagingSenderId: "157270456138",
  appId: "1:157270456138:web:9362f0c509d795a823f3b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;