import { updateDoc, serverTimestamp, doc } from "firebase/firestore";
import { dbInstance } from "../lib/firebase";
import { ALLOWED_BOOKING_STATUS } from "../config/constants";

export async function updateBookingStatus(bookingId, status) {
  if (bookingId === null || bookingId === undefined)
    throw new Error("booking id is required");

  if (!ALLOWED_BOOKING_STATUS.includes(status)) {
    throw new Error("invalid booking-status");
  }

  try {
    const bookingDocRef = doc(dbInstance, "bookings", bookingId);
    await updateDoc(bookingDocRef, {
      status,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    throw error;
  }
}
