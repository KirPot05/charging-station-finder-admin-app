import { Link } from "react-router-dom";
import { useVehicles } from "../../../hooks/vehicle";

function BookingItem({ id, booking }) {
  const [vehicle, loading, error] = useVehicles(booking?.vehicleId);

  if (error) return <div>{JSON.stringify(error)}</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <Link to={`/bookings/${id}`}>
      <div className="flex items-center space-x-4 my-4 py-2 px-4 hover:shadow-md">
        {/* Image */}
        {console.log(vehicle)}
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
            <span>{booking?.slot}</span>
            <span>{booking?.date}</span>
            <span>Ather 450X</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BookingItem;
