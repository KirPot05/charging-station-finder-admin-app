import { useNavigate } from "react-router-dom";
import { useVehicles } from "../../../hooks/vehicle";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { updateBookingStatus } from "../../../services/bookings";
import { capitalize } from "../../../utils/format";

function BookingItem({ id, booking }) {
  const [vehicle, loading, error] = useVehicles(booking?.vehicleId);
  const [status, setStatus] = useState(booking?.status || "");

  const navigate = useNavigate();

  const handleAction = async (bookingId, status) => {
    try {
      await updateBookingStatus(bookingId, status);
      toast.success("Updated booking status");
      setStatus(status);
    } catch (error) {
      toast.error(error?.message || "Failed to update status");
    }
  };

  const navigationHandler = (e) => {
    if (
      !["booking-completed", "booking-cancelled", "booking-postponed"].includes(
        e.target.id
      )
    )
      navigate(`/bookings/${id}`);
  };

  if (error) return <div>{JSON.stringify(error)}</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div
      className="flex items-center space-x-4 my-4 py-2 px-4 hover:shadow-md cursor-pointer"
      onClick={navigationHandler}
    >
      {/* Image */}
      <img
        src={
          vehicle?.imgUrl ||
          "https://media.zigcdn.com/media/content/2020/Jan/_mg_7635.jpg"
        }
        alt=""
        className="h-24 bg-contain"
      />

      {/* content */}
      <div className="space-y-5 flex-1 text-gray-500 font-semibold">
        <h4 className="text-lg">{booking?.station}</h4>
        <div className="flex justify-between items-center">
          <span>{booking?.timeSlot}</span>
          <span>{booking?.date}</span>
          <span>Ather 450X</span>

          {booking?.status === "pending-action" ? (
            <div className="text-sm space-x-3" id="booking-status-actions">
              <button
                id="booking-completed"
                className="bg-green-500 text-white px-3 py-2 rounded"
                onClick={() => handleAction(id, "completed")}
              >
                Completed
              </button>
              <button
                id="booking-cancelled"
                className="bg-red-500 text-white px-3 py-2 rounded"
                onClick={() => handleAction(id, "cancelled")}
              >
                Cancel
              </button>
              <button
                id="booking-postponed"
                className="bg-indigo-500 text-white px-3 py-2 rounded"
                onClick={() => handleAction(id, "postponed")}
              >
                Postpone
              </button>
            </div>
          ) : (
            <span>Booking status: {capitalize(status)}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingItem;
