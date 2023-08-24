import { z } from "zod";
import { linkValidation } from "../validations/linkValidation";
import { db } from "../firebase/init";
import { doc, setDoc } from "firebase/firestore";

const linksSubmit = async ({ links , user}: z.infer<typeof linkValidation>) => {
  try {
    await setDoc(doc(db, user, "profile"), {
      // TODO: I will handle this later on 
      profile: {
        user: user,
        links: [{link: links[0].link}]
      }
    });
  } catch (error) {
    console.log(error);
  }
};
export { linksSubmit };
