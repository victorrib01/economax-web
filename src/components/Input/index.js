export function Input({ placeholder, value, onChange }) {
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="text-center placeholder-center w-full rounded-2xl border border-blue-500 focus:border-blue-200 p-4"
    />
  );
}
