import CustomTab from "../components/global/CustomTab";
import BookingsList from "../components/pages/bookings/BookingsList";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import { dbInstance } from "../lib/firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

function Bookings() {
  const user = useSelector(selectUser);
  const [bookings, setBookings] = useState([]);
  const [value, loading, error] = useCollectionOnce(
    query(
      collection(dbInstance, "bookings"),
      where("userId", "==", user?.userId)
    )
  );

  useEffect(() => {
    if (value?.docs?.length > 0) {
      const items = [];
      value.docs.forEach((val) => {
        if (val.exists()) items.push({ bookingId: val.id, ...val.data() });
      });

      setBookings(items);
    }
  }, [value]);

  const handleFilterBookings = (filter = "") => {
    if (value?.docs?.length === 0) return;
    const filteredBookings = [];
    value.docs.forEach((val) => {
      if (val.exists() && val.data().status === filter)
        filteredBookings.push({ bookingId: val.id, ...val.data() });
    });
  };

  if (error) return <div>{JSON.stringify(error)}</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <main className="m-6 bg-white p-6 shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold"> Bookings </h1>

          <div className="flex items-center gap-x-4 font-semibold text-gray-500 mt-4">
            <CustomTab
              title="All"
              filter=""
              filterAction={handleFilterBookings}
            />
            <CustomTab
              title="Completed"
              filter="completed"
              filterAction={handleFilterBookings}
            />
            <CustomTab
              title="Cancelled"
              filter="cancelled"
              filterAction={handleFilterBookings}
            />
            <CustomTab
              title="Postponed"
              filter="postponed"
              filterAction={handleFilterBookings}
            />
          </div>
        </div>
        {/* Create new booking */}
        <Link to="/bookings/new">
          <button className="px-4 py-2 bg-primary text-white rounded shadow-md flex items-center gap-x-2">
            {" "}
            <PlusIcon className="h-5 w-5 font-bold" />
            New Booking{" "}
          </button>
        </Link>
      </div>
      {bookings && <BookingsList bookings={bookings} />}
    </main>
  );
}

export default Bookings;
