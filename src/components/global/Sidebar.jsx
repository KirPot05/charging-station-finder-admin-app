import React from "react";
import { mainLinks, secondaryLinks } from "../../mock/sidebarLinks";
import NavList from "./NavList";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";
import { logout as removeUser } from "../../features/userSlice";
import { useDispatch } from "react-redux";

function Sidebar({ link, setLink }) {
  const { logOut } = useAuth();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleLogout = async () => {
    await logOut();
    dispatch(removeUser());
    navigate("/");
  };

  return (
    <div className="bg-white p-2 w-1/5 min-h-screen">
      {/* Header */}
      <div className="p-2 sticky top-0 z-10 bg-white">
        <div>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/a/a3/Artemis_Networks_logo.png"
            className="h-20 w-20"
            alt=""
          />
          {/* <span className="font-bold text-2xl">Artemis</span> */}
        </div>
      </div>

      <hr />
      {/* Primary Section */}
      <NavList
        heading="MAIN"
        links={mainLinks}
        nestedLinks
        link={link}
        setLink={setLink}
      />

      {/* Utils section */}
      <h3 className="font-semibold text-gray-400 text-sm my-2"> Options </h3>
      <div>
        <button
          className="flex items-center space-x-3 text-gray-500 rounded-lg font-semibold py-2 px-4 m-2 transition duration-150 hover:text-black hover:bg-gray-200 cursor-pointer"
          onClick={handleLogout}
        >
          <ArrowTopRightOnSquareIcon className="w-5 h-5" />
          <span> Sign out </span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
