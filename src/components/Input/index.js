export function Input({ placeholder, value, onChange, ...rest }) {
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="text-center text-black placeholder-center w-full rounded-2xl border border-blue-500 focus:border-blue-200 p-4"
      {...rest}
    />
  );
}
