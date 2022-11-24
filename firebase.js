// Import the functions you need from the SDKs you need
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDnHUmA5Kkhgx4nfcb2btazUWldcZNT-FM",
    authDomain: "instagram-clone-d880f.firebaseapp.com",
    projectId: "instagram-clone-d880f",
    storageBucket: "instagram-clone-d880f.appspot.com",
    messagingSenderId: "526321475749",
    appId: "1:526321475749:web:38b2eade0b410ce4812d4c",
    measurementId: "G-0H4XPQL55M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export { auth, db };