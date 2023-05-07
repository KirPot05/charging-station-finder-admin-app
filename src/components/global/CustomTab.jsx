import React from "react";

function CustomTab({ title, filterAction, filter }) {
  return (
    <button
      onClick={() => filterAction(filter)}
      className="border-b-[3px] border-transparent focus:text-primary focus:border-b-primary"
    >
      {title}
    </button>
  );
}

export default CustomTab;
