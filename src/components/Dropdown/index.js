import React from "react";

export default function SelectComponent({ options, onChange }) {
  return (
    <div className="w-full flex justify-center ">
      <select
        name="time"
        id="time"
        className="w-full text-center p-2 rounded border"
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
