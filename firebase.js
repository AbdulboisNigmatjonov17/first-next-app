import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDA18LqSjNi9ZUCqRkU17bDvEdd9DwflTk",
    authDomain: "clone-5f419.firebaseapp.com",
    projectId: "clone-5f419",
    // storageBucket: "clone-5f419.firebasestorage.app",
    storageBucket: "clone-5f419.appspot.com",
    messagingSenderId: "504430723776",
    appId: "1:504430723776:web:143ec8f53211ce3d9ce325",
    measurementId: "G-91LSC3MTE3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        console.log(result.user);
    } catch (error) {
        console.error("Google login error:", error);
    }
};

const logOut = async () => {
    try {
        await signOut(auth);
        console.log("Logged out");
    } catch (error) {
        console.error("Logout error:", error);
    }
};

export { auth, signInWithGoogle, logOut };