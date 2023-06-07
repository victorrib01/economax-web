import { useAuth } from "@/contexts/auth";
import { assignCategory, createCategory } from "@/services/category";
import { AiFillPlusCircle } from "react-icons/ai";

export default function AddCategory({ value, fetchAll, setAllCategories }) {
  const { cookies } = useAuth();

  const handleRegisterCategory = async () => {
    try {
      const response = await createCategory({
        id: cookies.id,
        category: value,
      });
      const categoryId = response.data.id;

      if (categoryId) {
        const res = await assignCategory({
          id: cookies.id,
          selectedItems: [{ id: categoryId }],
          fetchData: fetchAll,
        });

        if (res) {
          setAllCategories((prevState) => [
            ...prevState,
            { id: categoryId, name: value },
          ]);
          alert("Categoria criada e ja associada ao seu perfil!");
        }
        console.log(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      onClick={handleRegisterCategory}
      className="w-full flex flex-row justify-between items-center bg-white my-1 p-6 border border-blue-500 cursor-pointer"
    >
      <p>Adicionar - {value}</p>
      <AiFillPlusCircle size={25} color="rgb(59 130 246)" />
    </div>
  );
}
