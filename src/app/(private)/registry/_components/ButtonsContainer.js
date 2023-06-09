"use client";

import { useRouter } from "next/navigation";

export default function ButtonsContainer() {
  const router = useRouter();
  return (
    <div className="w-full h-[50%] flex flex-col justify-around items-center ">
      <div
        className="p-10 bg-white w-full flex items-center justify-center cursor-pointer"
        onClick={() => router.push("/registry/spends_by_category")}
      >
        Gastos por categoria
      </div>
      <div
        className="p-10 bg-white w-full flex items-center justify-center cursor-pointer"
        onClick={() => router.push("/registry/spends_history")}
      >
        Relátorio
      </div>
    </div>
  );
}
