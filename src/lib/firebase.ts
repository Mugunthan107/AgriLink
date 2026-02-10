import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCg8E2ELJ74mYRJsEEOYYPtPHewWLPniBI",
    authDomain: "agrilink-3c83b.firebaseapp.com",
    projectId: "agrilink-3c83b",
    storageBucket: "agrilink-3c83b.firebasestorage.app",
    messagingSenderId: "388433161336",
    appId: "1:388433161336:web:06f430b4483561faa0d18d",
    measurementId: "G-RJLSMQTEE3"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, analytics, auth, db, googleProvider };
