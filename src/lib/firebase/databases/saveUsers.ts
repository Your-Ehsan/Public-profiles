import { DocumentData, doc, setDoc } from "firebase/firestore";
import { db } from "../init";
import { AuthData } from "@/types";

const saveUser = async ({ user }: AuthData) => {
  try {
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