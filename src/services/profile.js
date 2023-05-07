import { doc, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { dbInstance } from "../lib/firebase";

export async function updateUserProfile(profile, profileId) {
  try {
    if (profileId === undefined || profileId == "") {
      throw new Error("profile-id is required for updating profile");
    }

    const profileQuery = doc(dbInstance, "users", profileId);

    await updateDoc(profileQuery, { ...profile, updatedAt: serverTimestamp() });
  } catch (error) {
    throw error;
  }
}
