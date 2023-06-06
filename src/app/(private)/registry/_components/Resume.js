"use client";
import { useAuth } from "@/contexts/auth";
import api from "@/services/api";
import formatarCentavosParaReal from "@/utils/formatters/formatCentavosToReal";
import { useEffect, useState } from "react";

export default function Resume() {
  const { cookies } = useAuth();
  const [month, setMonth] = useState("");
  const [today, setToday] = useState("");

  async function getLastMonth() {
    try {
      const response = await api.post(
        "/soma_total_gastos_por_usuario_por_dia",
        {
          dias: "",
          id_usuario: cookies.id,
        }
      );

      setMonth(response.data["Total"]);
    } catch (err) {
      console.error("getLast5Records", err);
    }
  }
  async function getToday() {
    try {
      const response = await api.post(
        "/soma_total_gastos_por_usuario_por_dia",
        {
          dias: "0",
          id_usuario: cookies.id,
        }
      );

      setToday(response.data["Total"]);
    } catch (err) {
      console.error("getLast5Records", err);
    }
  }

  useEffect(() => {
    getToday();
    getLastMonth();
  }, []);
  return (
    <div className="h-[50%] flex flex-col justify-center items-center border">
      <p>Gastos do mês: {formatarCentavosParaReal(month)}</p>
      <p>Gastos do dia: {formatarCentavosParaReal(today)}</p>
    </div>
  );
}
