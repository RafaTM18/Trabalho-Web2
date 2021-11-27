import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDFn_Z-qqffGmF2x9XCDGzuaoOFR9FTLkg",
    authDomain: "repo-biblioteca.firebaseapp.com",
    databaseURL: "https://repo-biblioteca-default-rtdb.firebaseio.com",
    projectId: "repo-biblioteca",
    storageBucket: "repo-biblioteca.appspot.com",
    messagingSenderId: "1010623631223",
    appId: "1:1010623631223:web:4af9ac3bfa072ea687db72"
};

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const auth = getAuth(app) 

export {app, db, auth}