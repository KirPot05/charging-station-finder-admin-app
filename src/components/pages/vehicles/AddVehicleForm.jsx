import { PhotoIcon } from "@heroicons/react/24/outline";
import CustomButton from "../../global/CustomButton";
import DynamicInput from "../../global/DynamicInput";
import { useReducer } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { handleImageUpload } from "../../../services";
import { addVehicle } from "../../../services/vehicles";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/userSlice";

const initialState = {
  company: "",
  model: "",
  VIN: "",
  color: "",
  registrationNumber: "",
  registrationExpiry: "",
  owner: "",
  imgUrl: "",
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

function AddVehicleForm() {
  const user = useSelector(selectUser);

  const [vehicle, dispatch] = useReducer(reducer, initialState);
  const [vehicleImg, setVehicleImg] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [percentageUploadCompleted, setPercentageUploadCompleted] = useState(0);

  const navigate = useNavigate();

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    try {
      const addedVehicleId = await addVehicle({
        ...vehicle,
        userId: user?.userId,
      });
      toast.success("Vehicle Added Successfully");

      navigate(`/vehicles/${addedVehicleId}`);
    } catch (error) {
      toast.error(error?.message);
      console.error(error);
    }
  };

  const handleInput = (event) => {
    dispatch({
      type: "HANDLE_TEXT_INPUT",
      field: event.target.name,
      payload: event.target.value,
    });
  };

  const handleImagePreview = async (e) => {
    const localImageUrl = URL.createObjectURL(e.target.files[0]);
    setVehicleImg(localImageUrl);
    try {
      await handleImageUpload(
        e.target.files[0],
        setPercentageUploadCompleted,
        setImgUrl
      );

      dispatch({
        type: "HANDLE_TEXT_INPUT",
        field: "imgUrl",
        payload: imgUrl,
      });
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Add your vehicle
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Please check for the details once before submitting
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Cover photo
            </label>
            {vehicleImg === null ? (
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImagePreview}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center flex-col">
                <img src={vehicleImg} alt="Vehicle" className="h-72" />
                <div>
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Change Image</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImagePreview}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            )}
            {/* Progress bar */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-blue-700 ">
                  Upload Progress
                </span>
                <span className="text-sm font-medium text-blue-700 ">
                  {percentageUploadCompleted}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 ">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: percentageUploadCompleted + "%" }}
                ></div>
              </div>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="company"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Company
            </label>
            <div className="mt-2">
              <select
                id="company"
                name="company"
                autoComplete="company"
                value={vehicle?.company}
                onChange={(e) => handleInput(e)}
                className="block w-full rounded-md border-0 outline-none px-2 cursor-pointer py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option value="Tesla">Tesla</option>
                <option value="Ola">Ola</option>
                <option value="Hero">Hero</option>
                <option value="Ather">Ather</option>
              </select>
            </div>
          </div>

          <DynamicInput
            id="model"
            value={vehicle.model}
            setValue={handleInput}
            label="Model"
            isEditable={true}
          />

          {/* <div className="sm:col-span-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div> */}
          <DynamicInput
            id="VIN"
            label="VIN"
            value={vehicle.VIN}
            setValue={handleInput}
            isEditable={true}
          />
          <DynamicInput
            id="color"
            label="Color"
            value={vehicle.color}
            setValue={handleInput}
            isEditable={true}
          />
        </div>
      </div>

      <div className="border-b border-gray-900/10 pb-12 mt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Registration Details
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <DynamicInput
            id="registrationNumber"
            label="Registration Number"
            value={vehicle.registrationNumber}
            setValue={handleInput}
            isEditable={true}
          />
          <DynamicInput
            id="registrationExpiry"
            label="Registration Expiry"
            value={vehicle.registrationExpiry}
            setValue={handleInput}
            isEditable={true}
          />
          <DynamicInput
            id="owner"
            label="Owner"
            value={vehicle.owner}
            setValue={handleInput}
            isEditable={true}
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <CustomButton btnText="Save" />
      </div>
    </form>
  );
}

export default AddVehicleForm;
