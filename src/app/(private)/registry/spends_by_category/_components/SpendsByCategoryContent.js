"use client";
import SelectComponent from "@/components/Select";
import { useAuth } from "@/contexts/auth";
import api from "@/services/api";
import formatarCentavosParaReal from "@/utils/formatters/formatCentavosToReal";
import { useEffect, useState } from "react";

export default function SpendsByCategoryContent() {
  const { cookies } = useAuth();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);

  const options = [
    { value: "30", label: "30 dias" },
    { value: "90", label: "90 dias" },
    { value: "", label: "Último mês" },
  ];

  async function getData() {
    setLoading(true);
    try {
      const response = await api.post("/gastos_categoria_usuario", {
        dias: value.value,
        id_usuario: cookies.id,
      });
      setResults(
        Object.entries(response.data).map(([category, value]) => ({
          category,
          value,
        }))
      );
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, [value]);

  return (
    <div className="h-full flex flex-col">
      <div className="h-[10%]">
        <SelectComponent
          options={options}
          onChange={setValue}
          defaultValue={value}
          placeholder="Selecione algum período"
        />
      </div>
      <div className="my-2 flex-grow overflow-y-auto">
        <p>{value.value ? `Últimos ${value.value} dias` : "Último mês"}</p>
        <div id="list">
          {loading ? (
            <div>
              <p>loading...</p>
            </div>
          ) : results.length > 0 ? (
            results.map((item) => (
              <div
                key={item}
                className="p-10 my-2 bg-white w-full flex items-center justify-between"
              >
                <p>{item.category}</p>
                <p>{formatarCentavosParaReal(item.value)}</p>
              </div>
            ))
          ) : (
            <div>
              <p>sem registros a mostrar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
