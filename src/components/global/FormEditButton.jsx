import { PencilSquareIcon } from "@heroicons/react/24/solid";

function FormEditButton({ isDisabled, handleAction }) {
  return (
    <button
      className="flex items-center justify-center gap-x-2 border-2 border-gray-400 rounded-full px-4 py-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
      disabled={isDisabled}
      onClick={handleAction}
    >
      <PencilSquareIcon className="text-gray-600 h-5 w-5" />
      <span>Edit</span>
    </button>
  );
}

export default FormEditButton;
