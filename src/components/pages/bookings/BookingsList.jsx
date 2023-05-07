import React from "react";
import BookingItem from "./BookingItem";

function BookingsList({ bookings }) {
  return (
    <section className="mt-8">
      {bookings.map((booking) => (
        <BookingItem
          id={booking?.bookingId}
          key={booking?.bookingId}
          booking={booking}
        />
      ))}
    </section>
  );
}

export default BookingsList;
