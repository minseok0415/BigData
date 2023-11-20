import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBDX8Y3e2IjVQrexo_e0AR6RztTQaqHx6Y",
  authDomain: "p1xel-art.firebaseapp.com",
  databaseURL: "https://p1xel-art-default-rtdb.firebaseio.com",
  projectId: "p1xel-art",
  storageBucket: "p1xel-art.appspot.com",
  messagingSenderId: "179157940606",
  appId: "1:179157940606:web:c8f23daa9a740765599b2f"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();