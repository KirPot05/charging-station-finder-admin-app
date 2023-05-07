import { useEffect, useReducer, useState } from "react";
import DynamicInput from "../../global/DynamicInput";
import FormEditButton from "../../global/FormEditButton";
import CustomButton from "../../global/CustomButton";
import { toast } from "react-hot-toast";
import { updateVehicle } from "../../../services/vehicles";

const reducer = (state, action) => {
  switch (action.type) {
    case "HANDLE_TEXT_INPUT":
      return {
        ...state,
        [action.field]: action.payload,
      };

    case "REFRESH_DATA":
      return action.payload;

    default:
      return state;
  }
};

function VehicleForm({ vehicle, id }) {
  const initialState = {
    company: vehicle?.company,
    model: vehicle?.model,
    VIN: vehicle?.VIN,
    color: vehicle?.color,
    registrationNumber: vehicle?.registrationNumber,
    registrationExpiry: vehicle?.registrationExpiry,
    owner: vehicle?.owner,
    imgUrl: vehicle?.imgUrl,
    id,
  };

  const [editGeneralDetails, setEditGeneralDetails] = useState(false);
  const [editRegistrationDetails, setEditRegistrationDetails] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: "REFRESH_DATA",
      payload: { ...vehicle, id },
    });
  }, [vehicle]);

  const handleEditGeneralDetails = (event) => {
    event.preventDefault();
    setEditGeneralDetails(true);
  };

  const handleEditRegistrationDetails = (event) => {
    event.preventDefault();
    setEditRegistrationDetails(true);
  };

  const handleCancelEditFields = (event) => {
    event.preventDefault();
    setEditGeneralDetails(false);
    setEditRegistrationDetails(false);
  };

  const handleUpdateFields = async (event) => {
    event.preventDefault();
    try {
      await updateVehicle(state);

      toast.success("Successfully updated fields");
      setEditGeneralDetails(false);
      setEditRegistrationDetails(false);
    } catch (error) {
      toast.error(error?.message || "Error updating fields");
    }
  };

  const handleInput = (event) => {
    dispatch({
      type: "HANDLE_TEXT_INPUT",
      field: event.target.name,
      payload: event.target.value,
    });
  };

  return (
    <form onSubmit={handleUpdateFields}>
      <div className="border-b border-gray-900/10 pb-12">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            General Details
          </h2>

          <FormEditButton
            isDisabled={editGeneralDetails}
            handleAction={handleEditGeneralDetails}
          />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 relative">
          <DynamicInput
            id="company"
            label="Company"
            value={state?.company}
            setValue={handleInput}
            isEditable={editGeneralDetails}
          />

          <DynamicInput
            id="model"
            label="Model"
            value={state?.model}
            setValue={handleInput}
            isEditable={editGeneralDetails}
          />

          <DynamicInput
            id="vin"
            label="VIN"
            isEditable={editGeneralDetails}
            value={state?.VIN}
            setValue={handleInput}
          />

          <DynamicInput
            id="color"
            label="Color"
            value={state?.color}
            setValue={handleInput}
            isEditable={editGeneralDetails}
          />
        </div>
      </div>

      <div className="border-b border-gray-900/10 pb-12 mt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Registration Details
          </h2>

          <FormEditButton
            isDisabled={editRegistrationDetails}
            handleAction={handleEditRegistrationDetails}
          />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <DynamicInput
            id="registrationNumber"
            label="Registration Number"
            value={state?.registrationNumber}
            setValue={handleInput}
            isEditable={editRegistrationDetails}
          />
          <DynamicInput
            id="registrationExpiry"
            label="Registration Expiry"
            value={state?.registrationExpiry}
            setValue={handleInput}
            isEditable={editRegistrationDetails}
          />
          <DynamicInput
            id="owner"
            label="Owner"
            value={state?.owner}
            setValue={handleInput}
            isEditable={editRegistrationDetails}
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6 pb-10">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={handleCancelEditFields}
        >
          Cancel
        </button>
        <CustomButton
          btnText="Update"
          isDisabled={!(editGeneralDetails || editRegistrationDetails)}
        />
      </div>
    </form>
  );
}

export default VehicleForm;
