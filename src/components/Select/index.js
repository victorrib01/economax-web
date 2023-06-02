import Select from "react-select";

export default function SelectComponent({
  options,
  onChange,
  defaultValue,
  placeholder,
  ...rest
}) {
  return (
    <div className="w-full flex justify-center">
      <Select
        className="w-full text-center"
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            minHeight: "4rem",
            borderRadius: "1rem",
            borderColor: "rgb(59 130 246)",
          }),
        }}
        defaultValue={defaultValue}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        {...rest}
      />
      {/* <select
        name="time"
        id="time"
        className="w-full text-center p-2 rounded border"
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select> */}
    </div>
  );
}
