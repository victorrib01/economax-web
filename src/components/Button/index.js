export function Button({ title, onClick, outline }) {
  if (outline)
    return (
      <button
        onClick={onClick}
        className="rounded-2xl border border-blue-500 text-blue-500 font-bold hover:bg-blue-700 w-full p-4"
      >
        {title}
      </button>
    );
  return (
    <button
      onClick={onClick}
      className="rounded-2xl bg-blue-500 text-white font-bold hover:bg-blue-700 w-full p-4"
    >
      {title}
    </button>
  );
}
