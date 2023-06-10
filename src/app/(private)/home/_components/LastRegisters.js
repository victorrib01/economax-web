"use client";
import Loader from "@/components/Loader";
import formatarCentavosParaReal from "@/utils/formatters/formatCentavosToReal";
import { useEffect } from "react";

export default function LastRegisters({
  results,
  cookies,
  getLast5Records,
  loading,
}) {
  useEffect(() => {
    if (cookies) getLast5Records();
  }, [cookies]);

  return (
    <div className=" h-full w-full flex flex-col justify-center items-center">
      <p>Últimos 5 registros</p>
      <div className="my-2 flex-grow overflow-y-auto w-full">
        {loading ? (
          <Loader />
        ) : results.length > 0 ? (
          results.map((item) => (
            <div
              key={item.data}
              className="p-6 my-2 bg-white w-full flex items-center justify-between cursor-pointer"
            >
              <div>
                <p>{item.category}</p>
                <p>{formatarCentavosParaReal(item.value)}</p>
              </div>
              <div>
                <p>{new Date(item.data).toLocaleTimeString("pt-BR")}</p>
                <p>{new Date(item.data).toLocaleDateString("pt-BR")}</p>
              </div>
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
