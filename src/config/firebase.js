import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, FacebookAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDe-CioBGZKk5pgshIpfr7IgVYqC6muFqI",
  authDomain: "walking-buddy-636cb.firebaseapp.com",
  projectId: "walking-buddy-636cb",
  storageBucket: "walking-buddy-636cb.appspot.com",
  messagingSenderId: "275691149744",
  appId: "1:275691149744:web:8fcdb4ab53bd7ddd6ade75"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const imageDB = getStorage(app)
export const facebookProvider = new FacebookAuthProvider(); 

