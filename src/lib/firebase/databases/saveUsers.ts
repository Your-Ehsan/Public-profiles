import { doc, setDoc } from "firebase/firestore";
import { db } from "../init";
import { AuthData } from "@/types";

const saveUser = async ({ user }: AuthData) => {
  try {
    //   TODO: fix this type error
    // @ts-ignore
    await setDoc<DocumentData, DocumentData>(
      doc(db, "profiles", user?.uid || ""),
      {
        user: {
          email: user?.email,
          name: user?.displayName,
          image: user?.photoURL,
        },
        links: [{ link: "", provider: "" }],
      },
      { merge: true },
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { saveUser };
/**
{
        user: {
          email: Formdata?.user?.email,
          name: Formdata?.user.name,
        },
        links: Formdata?.links,
      },
      { merge: true }, 
 */
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
