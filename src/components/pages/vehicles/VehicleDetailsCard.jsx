import { Link } from "react-router-dom";

function VehicleDetailsCard({ vehicleId, model, company, imgUrl }) {
  return (
    <Link to={`/vehicles/${vehicleId}`}>
      <div className="p-4 hover:shadow-md rounded-md border-2 flex flex-col items-center">
        <img
          src={imgUrl}
          alt={model || ""}
          className="h-40 bg-contain rounded-md"
        />
        <div>
          <h4 className="font-semibold my-2">
            {company} {model}{" "}
          </h4>

          <p>Unique Id: {vehicleId}</p>
        </div>
      </div>
    </Link>
  );
}

export default VehicleDetailsCard;
