import { ChangeEvent } from "react";
import { uploadImage } from "./uploadImage";
import { DocumentData, doc, setDoc } from "firebase/firestore";
import { db } from "../init";
import { User } from "firebase/auth";

const handleUploadImage = async (
  e: ChangeEvent<HTMLInputElement>,
  fieldChange: (value: string) => void, userdata: User | undefined
) => {
  e.preventDefault();
  try {
    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      try {
        const file = e.target.files[0];
        if (!file.type.includes("image")) return;

        fileReader.onload = async (event) => {
          const imageDataUrl = event.target?.result?.toString() || "";
          fieldChange(imageDataUrl);
        };

        fileReader.readAsDataURL(file);
        // setFiles(Array.from(e.target.files));
        const { downloadURL, progress } = await uploadImage(
          userdata?.email,
          Array.from(e.target.files)[0],
        );
        await setDoc<DocumentData, DocumentData>(
          doc(db, "profiles", userdata?.uid || ""),
          {
            user: {
              image: downloadURL,
            },
          },
          { merge: true },
        );
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export { handleUploadImage };
