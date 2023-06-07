export default function CategorySelect({ category, isSelected, toggleItem }) {
  const recordable =
    "flex flex-col justify-center items-center bg-white my-1 py-6 border cursor-pointer";
  const selected =
    "flex flex-col justify-center items-center bg-blue-500 text-white my-2 py-6 border rounded-xl cursor-pointer";
  const registered =
    "flex flex-col justify-center items-center bg-black text-white my-2 border rounded-2xl";
  return (
    <p
      className={
        category?.registered ? registered : isSelected ? selected : recordable
      }
      onClick={() => toggleItem(category)}
    >
      {category?.registered ? `${category.name} - registrado` : category.name}
    </p>
  );
}
