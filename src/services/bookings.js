import { updateDoc, serverTimestamp, doc, query, collection, where, getDoc, getDocs } from "firebase/firestore";
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
    const bookingDocSnap = await getDoc(bookingDocRef);
    
    if(!bookingDocSnap.exists()) throw new Error("booking not found");

    const booking = bookingDocSnap.data();
    console.log(booking)

    const updateSlotsQuery = query(collection(dbInstance, 'slots'), where('chargingSlotId', '==', booking?.slot), where('timePeriod', '==', booking?.timeSlot));

    const updateTimeSlot = await getDocs(updateSlotsQuery);

    if(updateTimeSlot.docs.length === 0) throw new Error('Time slots not found error');

    const timeSlot = doc(dbInstance, 'slots', updateTimeSlot.docs[0].id);

    await updateDoc(timeSlot, {
      isAvailable: true
    })

    await updateDoc(bookingDocRef, {
      status,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    throw error;
  }
}
