import { collection, doc, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  useCollectionDataOnce,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import { dbInstance } from "../lib/firebase";

export function useBookings() {
  const [bookings, setBookings] = useState([]);

  const [value, loading, error] = useCollectionDataOnce(
    query(collection(dbInstance, "bookings"))
  );

  useEffect(() => {
    if (value.length > 0) {
      setBookings((prevBookings) => [...prevBookings, value]);
    }
  }, [bookings]);

  return [bookings, loading, error];
}

export function useBookings(bookingId) {
  const [booking, setBooking] = useState(null);

  const [value, loading, error] = useDocumentDataOnce(
    doc(dbInstance, "bookings", bookingId)
  );

  useEffect(() => {
    if (value !== undefined || value !== null) {
      setBooking(value);
    }
  }, []);

  return [booking, loading, error];
}
