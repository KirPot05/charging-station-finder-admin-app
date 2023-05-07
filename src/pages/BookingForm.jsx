import React from "react";
import BookSlotForm from "../components/pages/bookings/BookSlotForm";

function BookingForm() {
  return (
    <div className="m-6 bg-white py-6 px-20 shadow-md">
      <h1 className="font-bold text-4xl my-4">Book a new slot</h1>

      <BookSlotForm />
    </div>
  );
}

export default BookingForm;
