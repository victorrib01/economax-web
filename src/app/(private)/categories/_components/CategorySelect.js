export default function CategorySelect({ category }) {
  const recordable =
    "flex flex-col justify-center items-center bg-white my-2 border rounded-2xl cursor-pointer";
  const registered =
    "flex flex-col justify-center items-center bg-black text-white my-2 border rounded-2xl";
  return (
    <p className={category?.registered ? registered : recordable}>
      {category?.registered ? `${category.name} - registrado` : category.name}
    </p>
  );
}
