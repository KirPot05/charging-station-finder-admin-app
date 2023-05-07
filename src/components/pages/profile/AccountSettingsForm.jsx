import React, { useEffect, useReducer, useState } from "react";
import TextInput from "../../global/TextInput";
import {
  useCollectionDataOnce,
  useCollectionOnce,
} from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/userSlice";
import { dbInstance } from "../../../lib/firebase";
import { toast } from "react-hot-toast";
import { updateUserProfile } from "../../../services/profile";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  company: "",
  designation: "",
  bio: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "HANDLE_TEXT_INPUT":
      return {
        ...state,
        [action.field]: action.payload,
      };

    case "REFRESH_DATA":
      return {
        ...state,
        ...action.payload,
      };
  }
};
function AccountSettingsForm() {
  const user = useSelector(selectUser);
  const [accountDetails, dispatch] = useReducer(reducer, initialState);
  const [profileId, setProfileId] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (profileId?.trim() === "") throw new Error("profile not found");
      await updateUserProfile(accountDetails, profileId);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error?.message || "Unable to update user profile!");
    }
  };

  const handleInput = (event) => {
    dispatch({
      type: "HANDLE_TEXT_INPUT",
      field: event.target.name,
      payload: event.target.value,
    });
  };

  const [value, loading, error] = useCollectionOnce(
    query(collection(dbInstance, "users"), where("email", "==", user?.email))
  );

  useEffect(() => {
    if (value?.docs?.length > 0) {
      setProfileId(value.docs[0].id);

      dispatch({
        type: "REFRESH_DATA",
        payload: value.docs[0].data(),
      });
    }
  }, [value]);

  if (error) return <div>{JSON.stringify(error)}</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <section className="px-8 flex-1 my-6">
      <h3 className="font-semibold text-3xl">Account Settings </h3>

      <form className="grid grid-cols-2 mt-6" onSubmit={handleFormSubmit}>
        <TextInput
          title="First Name"
          name="firstName"
          value={accountDetails?.firstName}
          setValue={handleInput}
        />

        <TextInput
          title="Last Name"
          name="lastName"
          value={accountDetails?.lastName}
          setValue={handleInput}
        />

        <TextInput
          title="Email"
          name="email"
          value={accountDetails?.email}
          setValue={handleInput}
        />

        <TextInput
          title="Phone Number"
          name="phoneNumber"
          value={accountDetails?.phoneNumber}
          setValue={handleInput}
        />

        <TextInput
          title="Company"
          name="company"
          value={accountDetails?.company}
          setValue={handleInput}
        />

        <TextInput
          title="Designation"
          name="designation"
          value={accountDetails?.designation}
          setValue={handleInput}
        />

        <div className="col-span-2 flex flex-col m-2">
          <label className="text-gray-600 font-semibold"> Bio </label>
          <textarea
            className="px-2 py-1 rounded border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            cols="30"
            rows="5"
            name="bio"
            value={accountDetails?.bio}
            onChange={handleInput}
          ></textarea>
        </div>

        <div className="m-2 space-x-4">
          <button className="px-3 py-2 font-semibold bg-primary transition duration-150 text-white rounded">
            Update
          </button>
          <button className="px-3 py-2 font-semibold hover:bg-gray-300 transition duration-150 rounded">
            {" "}
            Cancel{" "}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AccountSettingsForm;
