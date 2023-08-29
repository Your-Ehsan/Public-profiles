import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  UploadTaskSnapshot,
  StorageError,
} from "firebase/storage";
import { storage } from "../init";
import { ImgUploadResult } from "@/types";

const uploadImage = async (
  username: string | null | undefined,
  file: File,
): Promise<ImgUploadResult> => {
  if (!file) return { downloadURL: null, progress: null };
  const storageRef = ref(
    storage,
    `users/${username || "error"}/images/${file.name}`,
  );

  const uploadTask = uploadBytesResumable(storageRef, file);
  return new Promise<ImgUploadResult>((resolve, reject) => {
    try {
      uploadTask.on(
        "state_changed",
        (snapshot: UploadTaskSnapshot) => {
          try {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              case "success":
                console.log("upload success");
                break;
            }
          } catch (error) {
            console.log("error while getting progress", error);
          }
        },
        (error: StorageError) => {
          switch (error.code) {
            case "storage/unauthorized":
              console.log("you dont have access permission");
              break;
            case "storage/canceled":
              console.log("User canceled the upload");
              break;
            case "storage/unknown":
              console.log("internal server error occured");
              break;
          }
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve({ downloadURL: downloadURL, progress: 100 });
          } catch (error) {
            console.log(error);
          }
        },
      );
    } catch (error) {
      console.error("error uploading image", error);
      reject({ downloadURL: null, progress: null });
    }
  });
};

export { uploadImage };
