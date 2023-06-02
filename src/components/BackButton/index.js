"use client";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();
  const backButtonActive = pathname.split("/").length > 2;

  function goBack() {
    router.push(pathname.split("/")[1]);
  }
  const translate = [
    ["spends_by_category", "Gastos por Categoria"],
    ["spends_history", "Relátorio"],
  ];

  return (
    <div
      className={
        !backButtonActive
          ? "hidden"
          : "w-full mb-4 cursor-pointer flex flex-row justify-between items-center"
      }
      onClick={goBack}
    >
      <AiOutlineArrowLeft size={30} />
      <p className="w-[95%] text-center pr-10 text-xl font-bold">
        {pathname.split("/").length === 3 &&
          translate.filter((item) => item[0] === pathname.split("/")[2])[0][1]}
      </p>
    </div>
  );
}
