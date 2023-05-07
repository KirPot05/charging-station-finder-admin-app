import { useEffect, useReducer, useState } from "react";
import VehicleCard from "./VehicleCard";
import SlotCard from "./SlotCard";
import CustomButton from "../../global/CustomButton";
import stations from "../../../mock/station";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import { dbInstance, realtimeDBInstance } from "../../../lib/firebase";
import { toast } from "react-hot-toast";
import { bookSlot } from "../../../services/bookings";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/userSlice";
import { useList } from "react-firebase-hooks/database";
import { ref } from "firebase/database";

const initialState = {
  vehicleId: "",
  station: "",
  date: "",
  slot: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "HANDLE_TEXT_INPUT":
      return {
        ...state,
        [action.field]: action.payload,
      };
  }
};

function BookSlotForm() {
  const user = useSelector(selectUser);
  const [booking, dispatch] = useReducer(reducer, initialState);

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedSlotId, setSelectedSlotId] = useState();
  const [selectedStation, setSelectedStation] = useState(0);

  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState([]);
  const [slots, setSlots] = useState([]);
  const [value, loading, error] = useCollectionOnce(
    query(
      collection(dbInstance, "vehicles"),
      where("userId", "==", user?.userId)
    )
  );

  const [snapshot, loadingRTDB, errorRTDB] = useList(ref(realtimeDBInstance));

  useEffect(() => {
    if (value?.docs?.length > 0) {
      const items = [];
      value.docs.forEach((val) => {
        if (val.exists()) items.push({ vehicleId: val.id, ...val.data() });
      });

      setVehicles(items);
    }
  }, [value]);

  useEffect(() => {
    if (snapshot?.length > 0) {
      setSlots(snapshot.map((snap) => snap.val()));
    }
  }, [snapshot]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const bookingId = await bookSlot({
        ...booking,
        station: stations[selectedStation].location,
        slot: stations[selectedStation].slots[selectedSlotId],
        vehicleId: selectedVehicle,
        userId: user?.userId,
      });

      toast.success("Successfully booked slot");
      navigate(`/bookings/${bookingId}`);
    } catch (error) {
      toast.error(error?.message || "Could not book slot");
    }
  };

  const handleInput = (event) => {
    dispatch({
      type: "HANDLE_TEXT_INPUT",
      field: event.target.name,
      payload: event.target.value,
    });
  };

  if (error || errorRTDB) return <div>{JSON.stringify(error)}</div>;
  if (loading || loadingRTDB) return <div>Loading...</div>;

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="border-b border-gray-900/10 pb-12">
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Book slots for charging your EV from the station nearest.
        </p>

        <div className="mt-8 flex items-center overflow-x-auto max-w-5xl scrolling-wrapper gap-x-3">
          {vehicles.length > 0 &&
            vehicles.map((vehicle, idx) => (
              <VehicleCard
                id={vehicle?.vehicleId}
                key={vehicle?.vehicleId}
                vehicle={vehicle}
                setSelectedVehicle={setSelectedVehicle}
                selectedVehicle={selectedVehicle}
              />
            ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          {/* Select vehicles */}

          <div className="sm:col-span-3">
            <label
              htmlFor="station"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Charging Stations
            </label>
            <div className="mt-2">
              <select
                id="station"
                name="station"
                autoComplete="station"
                value={booking?.station}
                onChange={(e) => {
                  handleInput(e);
                  setSelectedStation(
                    stations.findIndex(
                      (station) => station.location === e.target.value
                    )
                  );
                }}
                className="block px-2 outline-none w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 cursor-pointer"
              >
                {/* <option>TilakWadi</option>
                <option>Bogarves</option> */}
                {stations.map(({ location }) => (
                  <option key={location + Math.random()}> {location} </option>
                ))}
              </select>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="date"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Date
            </label>
            <div className="mt-2">
              <input
                id="date"
                name="date"
                type="date"
                value={booking?.date}
                onChange={handleInput}
                autoComplete="date"
                className="block px-2 outline-none w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 cursor-pointer"
              />
            </div>
          </div>

          <div className="col-span-full px-2 mt-3 space-y-2">
            <label
              htmlFor="slot"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Please select a slot
            </label>

            <div className="grid grid-cols-4 gap-4 p-2 border-2 border-gray-400  rounded-md">
              {stations[selectedStation].slots.map((slot, idx) => (
                <SlotCard
                  timing={slot}
                  slotId={idx}
                  key={idx + 1}
                  selectedSlotId={selectedSlotId}
                  setSelectedSlotId={setSelectedSlotId}
                  slots={slots[selectedStation]}
                  isVehicleSelected={selectedVehicle !== null}
                />
              ))}

              <div className="col-span-full flex items-center gap-x-8 mt-2 px-2">
                <div className="flex items-center gap-x-2">
                  <div className="w-4 h-4 bg-gray-400"></div>
                  <span className="text-sm">Not available</span>
                </div>

                <div className="flex items-center gap-x-2">
                  <div className="w-4 h-4 border-gray-400 border"></div>
                  <span className="text-sm">Available</span>
                </div>

                <div className="flex items-center gap-x-2">
                  <div className="w-4 h-4 bg-indigo-500 border"></div>
                  <span className="text-sm">Selected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <CustomButton btnText="Book" />
      </div>
    </form>
  );
}

export default BookSlotForm;
