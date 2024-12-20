import React from "react";

function DatePicker({ startDate, onDateChange, text }) {
  return (
    <div className="date-picker">
      <label htmlFor="startDate">{text}</label>
      <input
        type="date"
        id="startDate"
        value={startDate}
        onChange={onDateChange}
      />
    </div>
  );
}

export default DatePicker;
