import { auth } from "../init";
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
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
