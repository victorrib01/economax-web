export default function RegisteredCategory({ category }) {
  return (
    <div className="flex justify-center items-center p-2 bg-white my-2">
      <p>{category.name}</p>
    </div>
  );
}
