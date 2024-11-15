import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, connectAuthEmulator, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

// Connect to emulators in development
if (process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true') {
  try {
    if (typeof window !== 'undefined') {
      connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
      connectFirestoreEmulator(db, 'localhost', 8080);

      // Create development admin account
      const devAdmin = {
        email: 'admin@getbetter.test',
        password: 'admin123_dev'
      };

      createUserWithEmailAndPassword(auth, devAdmin.email, devAdmin.password)
        .then(() => {
          console.log('Development admin account created successfully');
        })
        .catch((error) => {
          if (error.code !== 'auth/email-already-in-use') {
            console.error('Error creating development admin:', error);
          }
        });
    }
  } catch (error) {
    console.error('Error connecting to Firebase emulators:', error);
  }
}

export { app, auth, db };