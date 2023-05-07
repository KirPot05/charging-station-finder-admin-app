import { MapPinIcon } from "@heroicons/react/24/outline";

function StationCard({
  location,
  name,
  slotsAvailable,
  googleMapLink,
  imgUrl,
  active,
}) {
  return (
    <div
      className={`flex flex-col items-center border px-2 py-4 gap-y-3 ${
        !active && "cursor-not-allowed"
      }`}
    >
      <img src={imgUrl || ""} className="h-20 bg-cover rounded-md" alt="" />
      <div className="text-sm text-center">
        <p>{name} </p>
        <p className="text-xs text-gray-700">{location}</p>
      </div>
      <p className="text-xs text-gray-700">
        {" "}
        Avaialable Slots: {slotsAvailable}{" "}
      </p>

      <a
        href={googleMapLink}
        target="_blank"
        referrerPolicy="no-referrer"
        className={`flex items-center  px-3 py-2 gap-x-2 text-white rounded active:scale-90 transition duration-150 ${
          active
            ? "bg-indigo-600 cursor-pointer"
            : "bg-indigo-300 cursor-not-allowed pointer-events-none"
        }`}
      >
        <MapPinIcon className="h-4 w-4" />
        <span className="text-sm"> View in Maps </span>
      </a>
    </div>
  );
}

export default StationCard;
