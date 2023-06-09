import { AiOutlineLoading } from "react-icons/ai";
import Loader from "../Loader";

export function Button({ title, onClick, outline, disable = false }) {
  if (outline) {
    const outlineClass =
      "rounded-2xl border border-blue-500 text-blue-500 font-bold hover:bg-blue-700 w-full p-4";
    const disableOutlineClass =
      "rounded-2xl border border-blue-500 text-blue-500 font-bold w-full p-4";
    return (
      <button
        onClick={onClick}
        className={disable ? disableOutlineClass : outlineClass}
        disabled={disable}
      >
        {title}
      </button>
    );
  }
  const defaultClass =
    "flex justify-center items-center rounded-2xl bg-blue-500 text-white font-bold hover:bg-blue-700 w-full p-4";
  const disableDefaultClass =
    "flex justify-center items-center rounded-2xl bg-blue-500 text-white font-bold w-full p-4";
  return (
    <button
      onClick={onClick}
      className={disable ? disableDefaultClass : defaultClass}
      disabled={disable}
    >
      {disable ? <Loader /> : title}
    </button>
  );
}
