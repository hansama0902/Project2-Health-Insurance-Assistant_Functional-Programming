import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCsyGX8v84pzRKONJmxnbAxJkTpBtnDrZo",
    authDomain: "health-insurance-assistant.firebaseapp.com",
    projectId: "health-insurance-assistant",
    storageBucket: "health-insurance-assistant.firebasestorage.app",
    messagingSenderId: "524189128999",
    appId: "1:524189128999:web:e1beee32f7e0be13b23102", 
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
