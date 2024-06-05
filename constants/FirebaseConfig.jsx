// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnUAOAtLBMQumY3A70sszdP-R88ZqtcyM",
  authDomain: "service-apps-7b734.firebaseapp.com",
  projectId: "service-apps-7b734",
  storageBucket: "service-apps-7b734.appspot.com",
  messagingSenderId: "872156036418",
  appId: "1:872156036418:web:209ac7613d841c6cf01cdb",
  measurementId: "G-WEN22C3RLH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);