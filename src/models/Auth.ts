import { Auth, GoogleAuthProvider, signInWithCredential } from "@firebase/auth";

export const FIREBASE_CONFIG = {
  apiKey: import.meta.env.VITE_CLIENT_FIREBASE_PUBLIC_API_KEY,
  authDomain: import.meta.env.VITE_CLIENT_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_CLIENT_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_CLIENT_FIREBASESTORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_CLIENT_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_CLIENT_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_CLIENT_FIREBASE_MEASUREMENT_ID
};

 export const signIn = (e: { preventDefault: () => void }, auth: Auth, createGoogleEvent?:  (tkn?: string) => Promise<boolean>) => {
    e.preventDefault();
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError || !token) {
        alert(
          `SSO ended with an error: ${JSON.stringify(chrome.runtime.lastError)}`
        );
        return;
      }
      signInWithCredential(auth, GoogleAuthProvider.credential(null, token))
        .then(() => {
          localStorage.setItem('authToken', JSON.stringify(token))
          if (createGoogleEvent) createGoogleEvent(token);
        })
        .catch((err) => {
          alert(`SSO ended with an error: ${err}`);
        });
    });
  };