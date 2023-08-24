import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  UploadTaskSnapshot,
  UploadMetadata,
  StorageError,
} from "firebase/storage";
import { storage } from "../init";
import { ImgUploadResult } from "@/types";

const uploadImage = async (
  username: string | undefined,
  file: File,
): Promise<ImgUploadResult> => {
  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, `users/${username || 'error'}/images/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  // Listen for state changes, errors, and completion of the upload.
  //   try {
  return new Promise<ImgUploadResult>((resolve, reject) => {
    let img: ImgUploadResult = {
      downloadURL: null,
      progress: null,
    };
    try {
      uploadTask.on(
        "state_changed",
        (snapshot: UploadTaskSnapshot) => {
          try {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
            // img.progress = progress;
            // resolve({ progress: progress, downloadURL: null });
          } catch (error) {
            console.log("error while getting progress", error);
            reject({ progress: null, downloadURL: null });
          }
        },
        (error: StorageError) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              console.log("you dont have access permission");
              break;
            case "storage/canceled":
              // User canceled the upload
              console.log("User canceled the upload");
              break;
            // ...
            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              console.log("internal server error occured");
              break;
          }
        },
        async () => {
          // Upload completed successfully, now we can get the download URL
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve({downloadURL: downloadURL , progress: 100})
          } catch (error) {
            console.log(error);
          }
          //   await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //     try {
          //       // resolve({ downloadURL: downloadURL, progress: 100 });
          //       img.downloadURL = downloadURL;
          //       console.log("File available at", downloadURL);
          //     } catch (error) {
          //       console.log("error getting while uploading image");
          //       reject({ downloadURL: null, progress: null });
          //     }
          //   });
        },
      );
    //   resolve({ downloadURL: img.downloadURL, progress: img.progress });
    } catch (error) {
      console.error("error uploading image", error);
      reject({ downloadURL: null, progress: null });
    }
  });
  //   } catch (error) {
  // console.error("error uploading image", error);
  // return {downloadURL: null, progress: null}
  // }
};

export { uploadImage };
