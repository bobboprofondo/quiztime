import { sign } from "crypto";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  connectAuthEmulator,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzcPS5NQEOOb00a_5CTmav0DMBP7oloCk",
  authDomain: "quizfire-f2d0a.firebaseapp.com",
  projectId: "quizfire-f2d0a",
  storageBucket: "quizfire-f2d0a.appspot.com",
  messagingSenderId: "757044941064",
  appId: "1:757044941064:web:dd24b074733fd8d1485cbd",
  measurementId: "G-4X84QLPDV7",
};

const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp };
