import CustomTab from "../components/global/CustomTab";
import BookingsList from "../components/pages/bookings/BookingsList";
import { useEffect, useState } from "react";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { collection, query } from "firebase/firestore";
import { dbInstance } from "../lib/firebase";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [value, loading, error] = useCollectionOnce(
    query(collection(dbInstance, "bookings"))
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

    if (filter === "") {
      setBookings(
        value.docs.map((val) => ({ bookingId: val.id, ...val.data() }))
      );
      return;
    }

    value.docs.forEach((val) => {
      if (val.exists() && val.data().status === filter) {
        filteredBookings.push({ bookingId: val.id, ...val.data() });
      }
    });

    setBookings(filteredBookings);
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
      </div>
      {bookings && <BookingsList bookings={bookings} />}
    </main>
  );
}

export default Bookings;
