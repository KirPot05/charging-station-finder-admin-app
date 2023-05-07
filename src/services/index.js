import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storageInstance } from "../lib/firebase";

export async function handleImageUpload(
  file,
  setPercentageUploaded,
  setImageDownloadURL
) {
  try {
    if (file === null || file === undefined) {
      throw new Error("Please choose a file first");
    }

    const storageRef = ref(storageInstance, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ); // update progress
        setPercentageUploaded(percent);
      },
      (err) => {
        throw err;
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setImageDownloadURL(url);
      }
    );
  } catch (error) {
    throw error;
  }
}
