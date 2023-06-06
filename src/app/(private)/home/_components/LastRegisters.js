"use client";
import formatarCentavosParaReal from "@/utils/formatters/formatCentavosToReal";
import { useEffect, useState } from "react";

export default function LastRegisters({ getLast5Records, loading }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    getLast5Records(setResults);
    console.log(results);
  }, []);
  return (
    <div className="h-full flex flex-col">
      <p>Últimos 5 registros</p>
      <div className="my-2 flex-grow overflow-y-auto">
        {loading ? (
          <div>
            <p>loading...</p>
          </div>
        ) : results.length > 0 ? (
          results.map((item) => (
            <div
              key={item.data}
              className="p-10 my-2 bg-white w-full flex items-center justify-between cursor-pointer"
            >
              <p>{item.category}</p>
              <p>{formatarCentavosParaReal(item.value)}</p>
            </div>
          ))
        ) : (
          <div>
            <p>
              Sem últimos registros, tente cadastrar acima para visualizar aqui
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
