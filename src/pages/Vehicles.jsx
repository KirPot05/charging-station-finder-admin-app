import EmptyCaseContainer from "../components/global/EmptyCaseContainer";
import VehicleDetailsCard from "../components/pages/vehicles/VehicleDetailsCard";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbInstance } from "../lib/firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

function Vehicles() {
  // const [vehicles, setVehicles] = useState([
  //   {
  //     company: "Ather",
  //     model: "450X",
  //     imgUrl:
  //       "https://images.hindustantimes.com/auto/img/2021/06/15/600x338/WhatsApp_Image_2021-02-10_at_15.31.09_1615966496207_1618140882750_1623760189517.jpg",
  //     registrationNumber: "KA 22 MD 4175",
  //     VIN: "sd534323dsmdamd",
  //   },

  //   {
  //     company: "Hero",
  //     model: "Electric AE",
  //     imgUrl:
  //       "https://images.yourstory.com/cs/54/51bbc650fc4b11ec863f3b2095783040/vidav1Pro-1665206890988.jpg",
  //     registrationNumber: "KA 23 MW 2132",
  //     VIN: "45assasas942132325",
  //   },

  //   {
  //     company: "Ola",
  //     model: "EV Hill Climb",
  //     imgUrl:
  //       "https://cdni.autocarindia.com/utils/imageresizer.ashx?n=https://cms.haymarketindia.net/model/uploads/modelimages/Ola-Electric-S1-010920211406.jpg",
  //     registrationNumber: "KA 23 EW 1902",
  //     VIN: "342sasrty5hhgrtrt6",
  //   },

  //   {
  //     company: "Bajaj",
  //     model: "Chetak",
  //     imgUrl: "https://www.chetak.com/rev-images/chetak-21/home/premium-1.png",
  //     registrationNumber: "KA 02 SD 1894",
  //     VIN: "56dass540593323455",
  //   },
  //   {
  //     company: "Bajaj",
  //     model: "Chetak",
  //     imgUrl: "https://www.chetak.com/rev-images/chetak-21/home/premium-1.png",
  //     registrationNumber: "KA 02 SD 1894",
  //     VIN: "56dass540593323455",
  //   },
  //   {
  //     company: "Bajaj",
  //     model: "Chetak",
  //     imgUrl: "https://www.chetak.com/rev-images/chetak-21/home/premium-1.png",
  //     registrationNumber: "KA 02 SD 1894",
  //     VIN: "56dass540593323455",
  //   },
  // ]);

  const user = useSelector(selectUser);
  const [vehicles, setVehicles] = useState([]);
  const [value, loading, error] = useCollectionOnce(
    query(collection(dbInstance, "vehicles"))
  );

  useEffect(() => {
    if (value?.docs?.length > 0) {
      const items = [];
      value.docs.forEach((val) => {
        if (val.exists()) items.push({ vehicleId: val.id, ...val.data() });
      });

      setVehicles(items);
    }
  }, [value]);

  if (error) return <div>{JSON.stringify(error)}</div>;
  if (loading) return <div>Loading...</div>;

  return vehicles.length > 0 ? (
    <main className="m-6 bg-white py-6 px-20 shadow-md">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-4xl my-4"> Your vehicles </h1>

        <Link to="/vehicles/new">
          <button className="px-4 py-2 bg-primary text-white rounded shadow-md flex items-center gap-x-2">
            {" "}
            <PlusIcon className="h-5 w-5 font-bold" />
            Add vehicle{" "}
          </button>
        </Link>
      </div>

      <section className="grid grid-cols-3 gap-6 mt-8">
        {vehicles.map(({ VIN, model, company, imgUrl, vehicleId }) => (
          <VehicleDetailsCard
            key={VIN}
            vehicleId={vehicleId}
            model={model}
            company={company}
            imgUrl={imgUrl}
          />
        ))}
      </section>
    </main>
  ) : (
    <EmptyCaseContainer
      title="New Vehicles"
      message="Get started by adding a new vehicle"
      btnText="Add Vehicle"
    />
  );
}

export default Vehicles;
