import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../init";
import { AuthData } from "@/types";

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

export { currentUser };
