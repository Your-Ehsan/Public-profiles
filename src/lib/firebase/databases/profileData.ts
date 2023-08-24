import { doc, getDoc } from "firebase/firestore";
import { db } from "../init";

export const valuesFromFirestore = async (username?: string | null) => {
    const docRef = doc(db, "profiles", username || "");
    // console.log(JSON.stringify(username));
  
    // Get a document, forcing the SDK to fetch from the offline cache.
    try {
      const doc = await getDoc(docRef);
  
      // Document was found in the cache. If no cached document exists,
      // an error will be returned to the 'catch' block below.
      // console.log("document data:", doc.data());
      return doc.data();
    } catch (e) {
      console.log("error getting data", e);
    }
  };