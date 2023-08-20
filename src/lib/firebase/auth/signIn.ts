const provider = new GoogleAuthProvider();
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../init";



const SignIn = async () => {
  try {
    return await signInWithPopup(auth, provider);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { SignIn };
