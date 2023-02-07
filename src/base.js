
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDknQNJca9m0r10c1jBz5s048a1jpPLCC8",
  authDomain: "fir-data-d8ade.firebaseapp.com",
  projectId: "fir-data-d8ade",
  storageBucket: "fir-data-d8ade.appspot.com",
  messagingSenderId: "220088387374",
  appId: "1:220088387374:web:7becab795ecd1ef76fdcbf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);