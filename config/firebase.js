// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeP9kSpo_LTDHNJRwr6sdPVTOQPJ_OjwU",
  authDomain: "vocab-19134.firebaseapp.com",
  projectId: "vocab-19134",
  storageBucket: "vocab-19134.appspot.com",
  messagingSenderId: "959178973305",
  appId: "1:959178973305:web:a3bcb37c8d8d0c296634a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};