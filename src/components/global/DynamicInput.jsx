import React from "react";

function Input({
  label,
  id,
  className,
  value,
  setValue,
  alignClass,
  isEditable,
}) {
  return (
    <div className={`${alignClass || "sm:col-span-3"}`}>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        {isEditable ? (
          <input
            type="text"
            name={id}
            id={id}
            autoComplete={id}
            value={value || ""}
            onChange={(e) => setValue(e)}
            className="block w-full rounded-md border-0 py-1.5 outline-none px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        ) : (
          <p className="mt-2 py-1.5 sm:text-sm sm:leading-6 text-gray-900">
            {" "}
            {value}{" "}
          </p>
        )}
      </div>
    </div>
  );
}

export default Input;
