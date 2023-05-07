import React from "react";

function TextInput({ title, type, value, setValue, className, name }) {
  return (
    <div className="flex flex-col m-2 gap-y-2">
      <label className="text-gray-600 font-semibold"> {title} </label>
      <input
        type={type || "text"}
        value={value}
        name={name}
        onChange={(e) => setValue(e)}
        className={` px-2 py-1 rounded border-2 border-gray-300 focus:outline-none focus:border-blue-500 ${
          className || ""
        }`}
      />
    </div>
  );
}

export default TextInput;
