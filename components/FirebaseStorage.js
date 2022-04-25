import { initializeApp } from "firebase/app";
import {getDownloadURL, getStorage, uploadBytesResumable} from '@firebase/storage';
import { ref } from "@firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDJY00w-vTDlEsTgc_SAX1YvwQxrFpwTBo",
    authDomain: "react-edemy.firebaseapp.com",
    projectId: "react-edemy",
    storageBucket: "react-edemy.appspot.com",
    messagingSenderId: "131595361261",
    appId: "1:131595361261:web:eb7aa8214f6e606a8925e4"
  };


 export const app=initializeApp(firebaseConfig)
  export const storage=getStorage(app);


  