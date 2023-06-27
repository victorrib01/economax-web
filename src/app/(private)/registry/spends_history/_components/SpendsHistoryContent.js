"use client";
import Loader from "@/components/Loader";
import SelectComponent from "@/components/Select";
import { useAuth } from "@/contexts/auth";
import { getLastSpends } from "@/services/spends";
import { getAllMonths } from "@/utils/dates";
import formatarCentavosParaReal from "@/utils/formatters/formatCentavosToReal";
import moment from "moment-timezone";
import { useEffect, useState } from "react";

const monthOptions = getAllMonths().map((item) => ({
  label: item.name,
  value: item.number,
}));

const yearOptions = [{ label: "2023", value: 2023 }];

export default function SpendsHistoryContent() {
  const { cookies } = useAuth();
  const [loading, setLoading] = useState(false);

  const [monthValue, setMonthValue] = useState(
    monthOptions.filter((item) => item.value == moment().month() + 1)[0]
  );
  const [yearValue, setYearValue] = useState(yearOptions[0]);

  const [results, setResults] = useState([]);

  async function getLast5Records() {
    setLoading(true);
    try {
      const response = await getLastSpends({
        jwt: cookies.jwt,
        month: monthValue.value,
        year: yearValue.value,
      });

      if (response.length == 0) return alert("Sem registros");

      setResults(response);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("getLast5Records", err);
    }
  }

  useEffect(() => {
    if (cookies) {
      getLast5Records();
    }
  }, [monthValue, yearValue, cookies]);

  return (
    <div className="h-full flex flex-col">
      <div className="h-[20%]">
        <SelectComponent
          options={monthOptions}
          onChange={setMonthValue}
          defaultValue={monthValue}
          placeholder="Selecione algum mês"
        />
        <SelectComponent
          options={yearOptions}
          onChange={setYearValue}
          defaultValue={yearValue}
          placeholder="Selecione algum ano"
        />
      </div>
      <div className="my-2 flex-grow overflow-y-auto">
        {/* <p>{value.value ? `Últimos ${value.value} dias` : "Último mês"}</p> */}
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
