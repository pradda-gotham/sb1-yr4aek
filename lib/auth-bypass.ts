import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const DEV_ADMIN = {
  email: 'admin@getbetter.test',
  password: 'admin123_dev'
} as const;

export async function signInAsDevAdmin() {
  if (process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR !== 'true') {
    throw new Error('Dev admin login only available with Firebase emulator');
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      DEV_ADMIN.email,
      DEV_ADMIN.password
    );

    if (!userCredential.user) {
      throw new Error('No user returned from Firebase');
    }

    return userCredential.user;
  } catch (error: any) {
    console.error('Dev admin login failed:', error);

    if (error.code === 'auth/network-request-failed') {
      throw new Error('Unable to connect to Firebase emulator. Please ensure the emulator is running.');
    }

    throw error;
  }
}