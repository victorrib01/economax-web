"use client";
import api from "@/services/api";
import LastRegisters from "./LastRegisters";
import RegisterForm from "./RegisterForm";
import { useState } from "react";

export default function HomeContent({ loginCookie }) {
  const [loading, setLoading] = useState(false);
  function parseDate(dateString) {
    const [date, time] = dateString.split(" ");
    const [year, month, day] = date.split("-").map(Number);
    const [hours, minutes, seconds] = time.split(":").map(Number);

    const dateFormatted = new Date(
      year,
      month - 1,
      day,
      hours,
      minutes,
      seconds
    );
    return dateFormatted;
  }
  async function getLast5Records(setResults) {
    try {
      const response = await api.post("/ultimas_despesas_usuario", {
        id_usuario: loginCookie.id,
        usuario: loginCookie.user,
        dias: "2",
      });

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
      console.error("getLast5Records", err);
      setLoading(false);
    }
  }
  return (
    <>
      <div className="h-[40%]">
        <RegisterForm
          loginCookie={loginCookie}
          getLast5Records={getLast5Records}
        />
      </div>
      <div className="h-[60%]">
        <LastRegisters
          loginCookie={loginCookie}
          getLast5Records={getLast5Records}
          loading={loading}
        />
      </div>
    </>
  );
}
