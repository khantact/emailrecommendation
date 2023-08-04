// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, browserLocalPersistence, setPersistence, sendPasswordResetEmail} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcHpSxweHWK46mjXTr9h1ekGg7iy87qL4",
  authDomain: "lorem-4412a.firebaseapp.com",
  projectId: "lorem-4412a",
  storageBucket: "lorem-4412a.appspot.com",
  messagingSenderId: "1074863414247",
  appId: "1:1074863414247:web:23dec9f07f1af9955bfb42",
  measurementId: "G-WT5BQKCYTZ"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const auth = getAuth(app);
export const db = getFirestore(app);
export { sendPasswordReset };

setPersistence(auth, browserLocalPersistence)