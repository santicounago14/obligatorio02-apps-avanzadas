import React from "react";
import Chip from "./Chip";

function ChipsContainer({ eventTypes, selectedEventTypes, onToggle }) {
  return (
    <div className="chips-container">
      {eventTypes.map((type) => (
        <Chip
          key={type}
          type={type}
          isSelected={selectedEventTypes.includes(type)}
          onClick={onToggle}
        />
      ))}
    </div>
  );
}

export default ChipsContainer;
