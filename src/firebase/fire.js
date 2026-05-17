import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBd1IOHlC9S7X6h2fVcT4791ZM42Muu874",
  authDomain: "journey-partnet.firebaseapp.com",
  projectId: "journey-partnet",
  storageBucket: "journey-partnet.appspot.com",
  messagingSenderId: "1038458693990",
  appId: "1:1038458693990:web:70a9fb0ad2b4ec6bc340a7",
  measurementId: "G-RRY0MG9NND",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
export const storage = getStorage(initializeApp(firebaseConfig));
export { ref, listAll, getDownloadURL };
export const auth = getAuth();
