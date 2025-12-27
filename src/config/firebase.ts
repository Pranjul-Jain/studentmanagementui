import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrigjFmhUrakXcVxTz8pa1nnQuNLTD9qk",
  authDomain: "qwiklabs-gcp-04-8d481e2f-df623.firebaseapp.com",
  projectId: "qwiklabs-gcp-04-8d481e2f-df623",
  storageBucket: "qwiklabs-gcp-04-8d481e2f-df623.firebasestorage.app",
  messagingSenderId: "967414883201",
  appId: "1:967414883201:web:e9c20f9e75219dbe02be80"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });