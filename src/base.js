// Import the functions you need from the SDKs you need

import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBcZwS5OfjWzKi6GbEtdT7ToYGOUjnRh50",
//   authDomain: "egplag.firebaseapp.com",
//   projectId: "egplag",
//   storageBucket: "egplag.appspot.com",
//   messagingSenderId: "1079518635974",
//   appId: "1:1079518635974:web:116653ff0c679bcd82b4c7",
//   measurementId: "G-B6385X8W2C"
// };
const firebaseConfig = {
  apiKey: "AIzaSyA7cmfdZV3TL-BY_2JE3D8EPO_k-azTzhQ",
  authDomain: "voicerec-a4c18.firebaseapp.com",
  projectId: "voicerec-a4c18",
  storageBucket: "voicerec-a4c18.appspot.com",
  messagingSenderId: "817233546866",
  appId: "1:817233546866:web:749f81d6faf99122fdfceb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);