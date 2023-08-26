import {  signInWithPopup, GoogleAuthProvider, User, UserCredential } from "firebase/auth";
import { auth } from "../init";
const provider = new GoogleAuthProvider();



const SignIn: () => Promise<unknown> = async () => {
  try {
    return await signInWithPopup(auth, provider)
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { SignIn };
