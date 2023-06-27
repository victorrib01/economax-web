"use client";
import Loader from "@/components/Loader";
import SelectComponent from "@/components/Select";
import { useAuth } from "@/contexts/auth";
import { getSpendsByCategory } from "@/services/spends";
import { getAllMonths } from "@/utils/dates";
import formatarCentavosParaReal from "@/utils/formatters/formatCentavosToReal";
import moment from "moment-timezone";
import { useEffect, useState } from "react";

const monthOptions = getAllMonths().map((item) => ({
  label: item.name,
  value: item.number,
}));

const yearOptions = [{ label: "2023", value: 2023 }];

export default function SpendsByCategoryContent() {
  const { cookies } = useAuth();
  const [loading, setLoading] = useState(false);
  const [monthValue, setMonthValue] = useState(
    monthOptions.filter((item) => item.value == moment().month() + 1)[0]
  );
  const [yearValue, setYearValue] = useState(yearOptions[0]);
  const [results, setResults] = useState([]);

  async function getData() {
    setLoading(true);
    try {
      const response = await getSpendsByCategory({
        month: monthValue.value || "",
        year: yearValue.value || "2023",
        jwt: cookies.jwt,
      });

      const formattedResponse = Object.entries(response.data).map(
        ([category, value]) => ({
          category,
          value,
        })
      );
      setResults(formattedResponse);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (cookies) {
      getData();
    }
  }, [monthValue, yearValue, cookies]);

  return (
    <div className="h-full flex flex-col">
      <div className="h-[20%]">
        <SelectComponent
          options={monthOptions}
          onChange={setMonthValue}
          defaultValue={{ value: "", label: "Último mês" }}
          placeholder="Selecione algum mês"
        />
        <SelectComponent
          options={yearOptions}
          onChange={setYearValue}
          defaultValue={{ value: "2023", label: "2023" }}
          placeholder="Selecione algum ano"
        />
      </div>
      <div className="my-2 flex-grow overflow-y-auto">
        {/* <p>{value.value ? `Últimos ${value.value} dias` : "Último mês"}</p> */}
        <div id="list">
          {loading ? (
            <Loader />
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
