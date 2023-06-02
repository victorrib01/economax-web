"use client";
import SelectComponent from "@/components/Select";
import { useState } from "react";

export default function SpendsHistoryContent() {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const options = [
    { value: "30", label: "30 dias" },
    { value: "90", label: "90 dias" },
    { value: "", label: "Último mês" },
  ];
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setValue(selectedValue);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="h-[10%]">
        <SelectComponent options={options} onChange={handleSelectChange} />
      </div>
      <div className="my-2 flex-grow overflow-y-auto">
        <p>{value ? `Últimos ${value} dias` : "Último mês"}</p>
        <div id="list">
          {results.map(() => (
            <div className="p-10 my-2 bg-white w-full flex items-center justify-between cursor-pointer">
              <p>bar</p>
              <p>R$ 51,00</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
