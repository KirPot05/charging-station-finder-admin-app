import { CheckCircleIcon } from "@heroicons/react/24/solid";

function VehicleCard({ vehicle, selectedVehicle, id, setSelectedVehicle }) {
  const handleSelection = () => {
    setSelectedVehicle(id);
  };

  return (
    <div
      className={`p-4 flex flex-col items-center border-[3px] ${
        id === selectedVehicle && "border-indigo-500"
      } rounded-md w-full min-w-[12rem] cursor-pointer relative space-y-5 max-w-sm`}
      onClick={handleSelection}
    >
      <CheckCircleIcon
        className={`h-5 w-5 absolute right-2 top-2 text-indigo-500 ${
          id === selectedVehicle ? "opacity-100" : "opacity-0"
        }`}
      />

      <img
        src={
          vehicle?.imgUrl ||
          "https://images.91wheels.com//assets/b_images/main/ather/450/ather-450-1590750894.png"
        }
        alt=""
        className="h-40 bg-contain"
      />

      <p
        className={`text-center ${
          id === selectedVehicle && "text-indigo-500"
        } `}
      >
        {`${vehicle?.company} ${vehicle?.model}`}
      </p>
    </div>
  );
}

export default VehicleCard;
