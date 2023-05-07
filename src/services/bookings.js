import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { dbInstance } from "../lib/firebase";

export async function bookSlot(data) {
  try {
    const bookingCollectionRef = collection(dbInstance, "bookings");
    const bookedSlot = await addDoc(bookingCollectionRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return bookedSlot.id;
  } catch (error) {
    throw error;
  }
}
