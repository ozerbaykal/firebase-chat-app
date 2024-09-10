// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth ,GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjWiIYxpamoe0yTXXq7gvRE5HEWX5Fn1U",
  authDomain: "hi-chat-42bf2.firebaseapp.com",
  projectId: "hi-chat-42bf2",
  storageBucket: "hi-chat-42bf2.appspot.com",
  messagingSenderId: "796270281892",
  appId: "1:796270281892:web:a519a870ddb883e2599231"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//firebase Auth referansını al

export const auth =getAuth(app);
export const provider = new GoogleAuthProvider();

//firestore veri tabanın refansını al
export const db=getFirestore(app);