import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { dbInstance } from "../lib/firebase";
import stations from "../mock/station";
import StationCard from "../components/pages/home/StationCard";

function Home() {
  const [primaryVehicle, setPrimaryVehicle] = useState(null);
  const user = useSelector(selectUser);

  const [value, loading, error] = useCollectionDataOnce(
    query(
      collection(dbInstance, "vehicles"),
      where("userId", "==", user?.userId),
      where("primary", "==", true)
    )
  );

  useEffect(() => {
    if (value?.length > 0) {
      setPrimaryVehicle(value[0]);
    }
  }, [value]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div> {JSON.stringify(error)} </div>;

  return (
    <main>
      <section className="bg-white m-6 p-8">
        <div className=" flex items-center justify-between">
          <h1 className="text-4xl font-semibold"> Welcome </h1>
          {/* Create new booking */}
          <Link to="/bookings/new">
            <button className="px-4 py-2 bg-primary text-white rounded shadow-md flex items-center gap-x-2">
              {" "}
              <PlusIcon className="h-5 w-5 font-bold" />
              New Booking{" "}
            </button>
          </Link>
        </div>

        <div className="mt-6">
          <p className="my-2">
            {" "}
            <span> Your location: </span> <span> Belagavi, Karnataka </span>
          </p>

          <img
            src={primaryVehicle?.imgUrl}
            className="h-72 bg-contain rounded"
            alt=""
          />
        </div>
      </section>

      <section className="bg-white m-6 p-6">
        <h4 className="font-semibold text-xl my-4">
          {" "}
          Nearby charging stations{" "}
        </h4>

        <div className="flex items-center gap-4">
          {stations.map(
            ({
              location,
              name,
              slotsAvailable,
              googleMapLink,
              imgUrl,
              active,
            }) => (
              <StationCard
                location={location}
                name={name}
                slotsAvailable={slotsAvailable}
                key={location + Math.random()}
                imgUrl={imgUrl}
                googleMapLink={googleMapLink}
                active={active}
              />
            )
          )}
        </div>
      </section>
    </main>
  );
}

export default Home;
