import React from "react";
import AccountSettingsForm from "../components/pages/profile/AccountSettingsForm";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

function Profile() {
  return (
    <main className="m-6 bg-white p-4 shadow-md flex gap-2">
      {/* Image Section */}
      <section className="px-4">
        <div className="flex flex-col items-center mt-20">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"
            alt="User Image"
            className="h-60 w-60 bg-contain rounded-full"
          />
          {/* <h3 className="text-2xl font-semibold">John Doe</h3> */}
        </div>
        <div className="flex items-center justify-center gap-x-6 mt-4">
          {/* Update Icons */}
          <PencilSquareIcon className="w-6 h-6 cursor-pointer" />
          <TrashIcon className="w-6 h-6 cursor-pointer" />
        </div>
      </section>

      {/* Settings Form */}
      <AccountSettingsForm />
    </main>
  );
}

export default Profile;
