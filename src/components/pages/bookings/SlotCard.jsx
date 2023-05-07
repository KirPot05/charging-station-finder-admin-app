import { useEffect, useState } from "react";

function SlotCard({
  timing,
  slotId,
  selectedSlotId,
  setSelectedSlotId,
  slots,
  isVehicleSelected,
}) {
  const [notAllowedSlot, setNotAllowedSlot] = useState(false);

  const handleSlotSelection = () => {
    if (!notAllowedSlot && isVehicleSelected) setSelectedSlotId(slotId);
  };

  useEffect(() => {
    if (typeof slots === "object" && Object.keys(slots).length > 0) {
      setNotAllowedSlot(Object.values(slots)[slotId] < 15);
    }
  }, [slots]);

  return (
    <div
      className={`text-xs text-center font-semibold border-2 ${
        selectedSlotId === slotId
          ? "border-indigo-500 text-indigo-500"
          : "text-gray-600"
      } rounded-md p-3 min-w-[10rem] ${
        notAllowedSlot
          ? "cursor-not-allowed bg-gray-400 text-gray-300"
          : "cursor-pointer"
      } `}
      onClick={handleSlotSelection}
    >
      {timing}{" "}
    </div>
  );
}

export default SlotCard;
