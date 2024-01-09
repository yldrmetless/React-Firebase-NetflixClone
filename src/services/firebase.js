import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAwRM_8SmddTK_qJ9vSvb-pGoIfjZ-gvKU",
  authDomain: "netflix-clone-test-3ba08.firebaseapp.com",
  projectId: "netflix-clone-test-3ba08",
  storageBucket: "netflix-clone-test-3ba08.appspot.com",
  messagingSenderId: "349450423005",
  appId:"1:349450423005:web:f366c8d78a81a703d76934"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)