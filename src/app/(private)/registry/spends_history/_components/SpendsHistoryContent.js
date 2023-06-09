"use client";
import Loader from "@/components/Loader";
import SelectComponent from "@/components/Select";
import { useAuth } from "@/contexts/auth";
import api from "@/services/api";
import formatarCentavosParaReal from "@/utils/formatters/formatCentavosToReal";
import { useEffect, useState } from "react";

export default function SpendsHistoryContent() {
  const { cookies } = useAuth();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const options = [
    { value: "30", label: "30 dias" },
    { value: "90", label: "90 dias" },
    { value: "", label: "Último mês" },
  ];
  async function getLast5Records() {
    setLoading(true);
    try {
      const response = await api.post("/ultimas_despesas_usuario", {
        id_usuario: cookies.id,
        usuario: cookies.user,
        dias: value.value || "",
      });

      if (response.data.length == 0) return alert("Sem registros");

      function parseDate(dateString) {
        const [date, time] = dateString.split(" ");
        const [year, month, day] = date.split("-").map(Number);
        const [hours, minutes, seconds] = time.split(":").map(Number);

        return new Date(year, month - 1, day, hours, minutes, seconds);
      }

      const sortedData = response.data
        .map((item) => {
          return {
            data: parseDate(item.data),
            category: item.categoria,
            // MOCK
            value: item.valor,
            // value: Math.floor(Math.random() * (99999 - 50 + 1) + 50),
          };
        })
        .sort((a, b) => b.data - a.data);

      setResults(sortedData);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("getLast5Records", err.toJSON());
    }
  }

  useEffect(() => {
    if (cookies) {
      getLast5Records();
    }
  }, [value, cookies]);

  return (
    <div className="h-full flex flex-col">
      <div className="h-[10%]">
        <SelectComponent
          options={options}
          onChange={setValue}
          defaultValue={{ value: "", label: "Último mês" }}
          placeholder="Selecione algum período"
        />
      </div>
      <div className="my-2 flex-grow overflow-y-auto">
        <p>{value.value ? `Últimos ${value.value} dias` : "Último mês"}</p>
        <div id="list">
          {loading ? (
            <Loader />
          ) : (
            results.map((item) => (
              <div
                key={item.data}
                className="p-6 my-2 bg-white w-full flex items-center justify-between"
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
          )}
        </div>
      </div>
    </div>
  );
}
