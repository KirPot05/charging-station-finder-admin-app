import {
  ArchiveBoxIcon,
  CalendarIcon,
  ChatBubbleBottomCenterIcon,
  ChevronDownIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import {
  FolderIcon,
  EnvelopeIcon as SolidEnvelope,
  PhoneIcon as SolidPhone,
} from "@heroicons/react/24/solid";
import DetailsItem from "../components/pages/bookings/DetailsItem";

function BookingPage() {
  return (
    <main className="m-6 bg-white py-6 px-20 shadow-md">
      <h4 className="font-semibold">Booking Details</h4>

      <h1 className="font-bold text-4xl my-4"> Slot No. 2 </h1>
      {/* Utils */}
      <div className="flex items-center font-semibold space-x-10">
        <div className="flex items-center space-x-2">
          <ChatBubbleBottomCenterIcon className="h-5 w-5" />
          <span className="text-gray-500 text-sm">Leave a note</span>
        </div>

        <div className="flex items-center space-x-2">
          <CalendarIcon className="h-5 w-5" />
          <span className="text-gray-500 text-sm">Add to calendar</span>
        </div>
      </div>

      <section className="my-10">
        <div>
          <div className="bg-[#F4F6FA] rounded py-2 px-6 flex items-center space-x-3 font-semibold">
            <ChevronDownIcon className="h-4 w-4" />
            <h5>Details</h5>
          </div>

          <div className="px-10 mt-6 space-y-3 font-semibold">
            <DetailsItem
              icon={ArchiveBoxIcon}
              title="Agency"
              value="Junot Paris"
            />

            <DetailsItem
              icon={PhoneIcon}
              title="Telephone"
              value="903 548 4583"
            />

            <DetailsItem
              icon={EnvelopeIcon}
              title="Email"
              value="test@email.com"
            />

            <DetailsItem
              icon={MapPinIcon}
              title="Address"
              value="Test address"
            />

            {/* your contact */}
            <div className="grid grid-cols-4 gap-x-2 py-4 border-t-2 border-b-2">
              <div className="flex items-center gap-x-2">
                <UserIcon className="h-4 w-4" />
                Your contact :
              </div>

              <div className="col-span-2">
                <div className="bg-purple-100 flex items-center gap-x-2 w-3/4 ml-4 p-2 rounded-full">
                  <UserCircleIcon className="h-6 w-6" />
                  <span className="text-purple-800"> John Doestdas </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-x-3">
                <button className="px-3 py-1 flex items-center gap-x-2 text-gray-500 font-semibold border-2 border-gray-400 rounded">
                  <SolidEnvelope className="h-4 w-4" />
                  Email
                </button>

                <button className="px-3 py-1 flex items-center gap-x-2 text-gray-500 font-semibold border-2 border-gray-400 rounded">
                  <SolidPhone className="h-4 w-4" />
                  Call
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-[#F4F6FA] rounded py-2 px-6 flex items-center space-x-3 font-semibold">
            <ChevronDownIcon className="h-4 w-4" />
            <h5>Your information</h5>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-2 gap-x-8 items-center p-4">
            <div className="bg-green-100 flex p-8 rounded gap-x-3">
              <span className="bg-green-50 h-14 w-14 rounded-full p-5 flex items-center justify-center">
                AB
              </span>
              <div className="w-full">
                <span className="font-semibold">Antonie Bolaroiud</span>
                <p className="text-gray-500">
                  {" "}
                  <span>CDD</span> . <span>1900$/month</span>
                </p>

                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-x-2 mt-6 relative">
                    <FolderIcon className="h-6 w-6 text-purple-800" />
                    <span>Task Completed</span>

                    <div className="bg-green-600 w-3 h-3 rounded-full absolute left-3 -bottom-[3px]"></div>
                  </div>

                  <span>6/6</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-100 flex p-8 rounded gap-x-3">
              <span className="bg-blue-50 h-14 w-14 rounded-full p-5 flex items-center justify-center">
                AB
              </span>
              <div className="w-full">
                <span className="font-semibold">Antonie Bolaroiud</span>
                <p className="text-gray-500">
                  {" "}
                  <span>CDD</span> . <span>1900$/month</span>
                </p>

                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-x-2 mt-6 relative">
                    <FolderIcon className="h-6 w-6 text-purple-800" />
                    <span>Task Completed</span>

                    <div className="bg-green-600 w-3 h-3 rounded-full absolute left-3 -bottom-[3px]"></div>
                  </div>

                  <span>6/6</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default BookingPage;
