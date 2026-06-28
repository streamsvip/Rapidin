// =====================================
// RAPIDÍN - FIREBASE
// =====================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-storage.js";

const firebaseConfig = {

    apiKey: "AIzaSyCgmOXyyCMc-3cAo2p-Uf-0jpnujVDHhCw",

    authDomain: "rapidin-87442.firebaseapp.com",

    projectId: "rapidin-87442",

    storageBucket: "rapidin-87442.firebasestorage.app",

    messagingSenderId: "564060557075",

    appId: "1:564060557075:web:59d394a5e0e8ba10c954e6",

    measurementId: "G-YE7FL60M4J"

};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);

export {

    auth,

    db,

    storage

};