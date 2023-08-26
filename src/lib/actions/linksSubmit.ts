import { db } from "../firebase/init";
import { DocumentData, doc, setDoc } from "firebase/firestore";
import { toast } from "@/components/ui/use-toast";
import { FormValues } from "@/types";
import { User } from "firebase/auth";

const linksSubmit = async (
  Formdata: FormValues,
  userdata: User | undefined,
) => {
  try {
    await setDoc<DocumentData, DocumentData>(
      doc(db, "profiles", userdata?.uid || ""),
      {
        user: {
          email: Formdata?.user?.email,
          name: Formdata?.user.name,
        },
        links: Formdata?.links,
      },
      { merge: true },
    );
    toast({
      title: "You submitted the following values:",
      description: "",
    });
  } catch (error) {
    console.log(`error saving profile --> ${error}`);
  }
};

export { linksSubmit };
