"use client";
import { useAuth } from "@/contexts/auth";
import { getSumDaySpends } from "@/services/spends";
import formatarCentavosParaReal from "@/utils/formatters/formatCentavosToReal";
import { useEffect, useState } from "react";

export default function Resume() {
  const { cookies } = useAuth();
  const [month, setMonth] = useState("");
  const [today, setToday] = useState("");

  // async function getLastMonth() {
  //   try {
  //     const response = getSumDaySpends({ jwt: cookies.jwt });
  //     setMonth(response.data["Total"]);
  //   } catch (err) {
  //     console.error("getLast5Records", err);
  //   }
  // }
  async function getToday() {
    try {
      const response = await getSumDaySpends({
        jwt: cookies.jwt,
      });

      setToday(response.data["Total"]);
    } catch (err) {
      console.error("getLast5Records", err);
    }
  }

  useEffect(() => {
    if (cookies) {
      getToday();
      // getLastMonth();
    }
  }, [cookies]);
  return (
    <div className="w-full h-[50%] flex flex-col justify-center items-center border">
      <p>Gastos do mês: {formatarCentavosParaReal(month)}</p>
      <p>Gastos do dia: {formatarCentavosParaReal(today)}</p>
    </div>
  );
}
