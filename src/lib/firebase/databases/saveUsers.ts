import { doc, setDoc } from "firebase/firestore";
import { db } from "../init";
import { AuthData } from "@/types";

const saveUser = async ({ user }: AuthData) => {
  try {
    //   TODO: fix this type error
    // @ts-ignore
    await setDoc(doc(db, "users", user?.email), {
      email: user?.email,
      image: user?.photoURL,
      name: user?.displayName,
      uid: user?.uid,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { saveUser };

/**
 const currentUser = async (): Promise<AuthData> => {
  return new Promise<AuthData>((resolve, reject) => {
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          // User is signed in
          const uid = user.uid;
          resolve({ user, uid });
        } else {
          // User is signed out
          resolve({ user: null, uid: null });
        }
      },
      (error) => {
        reject(error);
      },
    );
  });
};
*/
