import React from "react";

function Chip({ type, isSelected, onClick }) {
  return (
    <button
      className={`chip ${isSelected ? "selected" : ""}`}
      onClick={() => onClick(type)}
    >
      {type}
    </button>
  );
}

export default Chip;
