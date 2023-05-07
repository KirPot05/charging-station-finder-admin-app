import { doc, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { dbInstance } from "../lib/firebase";

export function useVehicles(vehicleId) {
  if (vehicleId === null)
    return [null, false, new Error("Vehicle Id is required")];

  const [vehicle, setVehicle] = useState(null);

  const [value, loading, error] = useDocumentDataOnce(
    query(doc(dbInstance, "vehicles", vehicleId))
  );

  useEffect(() => {
    if (value !== undefined || value !== null) {
      setVehicle(value);
    }
  }, [value]);

  return [vehicle, loading, error];
}
