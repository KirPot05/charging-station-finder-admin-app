import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { dbInstance } from "../lib/firebase";

export async function addVehicle(data) {
  try {
    if (
      data !== null &&
      Object.values(data).find((val) => val.trim() === "") !== undefined
    ) {
      throw new Error("Please enter all the fields");
    }

    const vehicleCollectionRef = collection(dbInstance, "vehicles");
    const addedVehicle = await addDoc(vehicleCollectionRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return addedVehicle.id;
  } catch (error) {
    throw error;
  }
}

export async function updateVehicle(vehicle) {
  try {
    const vehicleDocRef = doc(dbInstance, "vehicles", vehicle?.id);

    await updateDoc(vehicleDocRef, {
      ...vehicle,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    throw error;
  }
}
