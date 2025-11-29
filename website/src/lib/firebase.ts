import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDGNZpB8LoKL7GHJ-IBH3vEqjjdbiVpQ-c",
  authDomain: "pageantwagon-57ed3.firebaseapp.com",
  projectId: "pageantwagon-57ed3",
  storageBucket: "pageantwagon-57ed3.firebasestorage.app",
  messagingSenderId: "440728670350",
  appId: "1:440728670350:web:19dd52761f13238090f9df",
  measurementId: "G-2MMWW3KDRB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
