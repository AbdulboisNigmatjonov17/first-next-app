import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDA18LqSjNi9ZUCqRkU17bDvEdd9DwflTk",
    authDomain: "clone-5f419.firebaseapp.com",
    projectId: "clone-5f419",
    storageBucket: "clone-5f419.firebasestorage.app",
    messagingSenderId: "504430723776",
    appId: "1:504430723776:web:143ec8f53211ce3d9ce325",
    measurementId: "G-91LSC3MTE3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);