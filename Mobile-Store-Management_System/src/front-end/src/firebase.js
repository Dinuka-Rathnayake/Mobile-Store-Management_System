 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFgFNZaT6H6Eq7uNLXXG_H8sa9MwKzwOw",
  authDomain: "happy-mobile-ad15a.firebaseapp.com",
  projectId: "happy-mobile-ad15a",
  storageBucket: "happy-mobile-ad15a.appspot.com",
  messagingSenderId: "777148810508",
  appId: "1:777148810508:web:bdaf1c3d00f3d5db51f529"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);