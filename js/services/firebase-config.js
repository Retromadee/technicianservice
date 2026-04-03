/* Firebase Config — Stub (replace with real config) */
const FirebaseConfig = (() => {
    // Replace with your Firebase project config
    const config = {
        apiKey: "AIzaSyCbiWxLosywoHx-uW9FI235QFK4BQfxorE",
        authDomain: "capstone2-a2820.firebaseapp.com",
        projectId: "capstone2-a2820",
        storageBucket: "capstone2-a2820.firebasestorage.app",
        messagingSenderId: "100668878893",
        appId: "1:100668878893:web:de4e9c3a54f5d19a38c8a4",
        measurementId: "G-EJXP9N8V9T",
        databaseURL: "https://capstone2-a2820-default-rtdb.europe-west1.firebasedatabase.app/"
    };

    let initialized = false;
    let db = null;

    function init() {
        if (initialized) return;
        
        if (isConfigured()) {
            // Import Firebase app and firestore if not already loaded (assuming CDN scripts)
            // firebase.initializeApp(config);
            // db = firebase.firestore();
            console.log('🔥 Firebase initialized with real config');
        } else {
            console.log('🔥 Firebase config loaded (stub mode)');
            // Create a mock db for development without credentials
            db = {
                collection: () => ({
                    doc: () => ({
                        onSnapshot: (cb) => {
                            console.log('📡 Listening to mock Firestore');
                            return () => {}; // Unsubscribe
                        }
                    }),
                    onSnapshot: (cb) => {
                        console.log('📡 Listening to mock Firestore collection');
                        return () => {}; // Unsubscribe
                    }
                })
            };
        }
        initialized = true;
    }

    function isConfigured() {
        return config.apiKey !== "YOUR_API_KEY";
    }

    init();
    return { config, isConfigured, getDb: () => db };
})();
