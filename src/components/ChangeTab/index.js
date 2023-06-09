import { useUserContext } from "@/contexts/user";

export function ChangeTab({}) {
  const { tab, toggleType } = useUserContext();

  // console.log(tab);
  return (
    <div
      onClick={toggleType}
      className="flex flex row items-center justify-center h-full w-[50%] "
    >
      <div className="bg-white  py-1 rounded-full w-full flex flex-row justify-between items-center cursor-pointer">
        <div
          className={
            tab == "expense"
              ? " bg-blue-600 rounded-full px-2 text-white"
              : "px-2"
          }
        >
          Gastos
        </div>
        <div
          className={
            tab == "earn" ? " bg-blue-600 rounded-full px-2 text-white" : "px-2"
          }
        >
          Ganhos
        </div>
      </div>
    </div>
  );
}
