import { doc, getDoc } from "firebase/firestore";
import { db } from "../init";

export const valuesFromFirestore = async (username?: string | null) => {
    const docRef = doc(db, "profiles", username || "");
    try {
      const doc = await getDoc(docRef);
      return doc.data();
    } catch (e) {
      console.log("error getting data", e);
    }
  };