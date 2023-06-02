"use client";
import { useState } from "react";

export default function LastRegisters() {
  const [results, setResults] = useState([1, 2, 3, 4, 5]);
  return (
    <div className="h-full flex flex-col">
      <p>Últimos 5 registros</p>
      <div className="my-2 flex-grow overflow-y-auto">
        {results.map(() => (
          <div className="p-10 my-2 bg-white w-full flex items-center justify-between cursor-pointer">
            <p>mercado</p>
            <p>R$55,55</p>
          </div>
        ))}
      </div>
    </div>
  );
}
