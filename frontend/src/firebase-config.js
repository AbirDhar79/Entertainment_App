import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "firebase/auth";


//firebase credentials
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const API_URL = import.meta.env.VITE_API_URL


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// sign up with email
export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// sign in with email
export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// sign in with Google
export async function GoogleLogin() {
  return signInWithPopup(auth, provider)
    .then((result) => {
      // On successful sign-in
      // console.log("Successfully signed in with Google:", result.user);
      return result.user;
    })
    .catch((error) => {
      // Handle Errors here
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // Log or handle the error as needed
      console.error("Google sign-in error:", errorCode, errorMessage);
      throw error;
    });
}

// forgot password
export function forgotPassword(email) {
  return sendPasswordResetEmail(auth, email);
}

// sign out
export function logOut() {
  return signOut(auth);
}

// Custom Hook for Current User
export function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setIsLoading(false); // Set loading to false when user data is retrieved
    });

    return () => unsubscribe();
  }, []);

  return { user, isLoading };
}


//function to add and remove bookmarks...................

export const addBookmark = async (movieId, mediaType) => {
  try {
    onAuthStateChanged(auth, async (user) => {
      const token = await user.getIdToken()
      // console.log(user.accessToken);
      console.log(JSON.stringify({ movieId, mediaType }));
      const options = {
        method: "POST", // Adjust method based on API needs
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ movieId, mediaType })
      };
      fetch(`${API_URL}/bookmark/add`, options)
    })
  } catch (err) {
    console.log(err)
  }
}

export const removeBookmark = async (movieId, mediaType) => {
  try {
    onAuthStateChanged(auth, async (user) => {
      const token = await user.getIdToken()
      // console.log(user.accessToken);
      console.log(JSON.stringify({ movieId, mediaType }));
      const options = {
        method: "POST", // Adjust method based on API needs
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ movieId, mediaType })
      };
      fetch(`${API_URL}/bookmark/remove`, options)
    })
  } catch (err) {
    console.log(err)
  }
}

