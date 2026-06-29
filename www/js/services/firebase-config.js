// Firebase configuration provided by user
const firebaseConfig = {
  apiKey: "AIzaSyCbiWxLosywoHx-uW9FI235QFK4BQfxorE",
  authDomain: "capstone2-a2820.firebaseapp.com",
  databaseURL: "https://capstone2-a2820-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "capstone2-a2820",
  storageBucket: "capstone2-a2820.firebasestorage.app",
  messagingSenderId: "100668878893",
  appId: "1:100668878893:web:de4e9c3a54f5d19a38c8a4",
  measurementId: "G-EJXP9N8V9T"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const database = firebase.database();
// Optional: storage if included later
// const storage = firebase.storage();

console.log("Firebase initialized successfully with Realtime Database.");

const FirebaseConfig = {
    getDb: () => {
        // Expose real Firebase Realtime database natively
        return database;
    }
};
