"use client";
import Loader from "@/components/Loader";
import { useAuth } from "@/contexts/auth";
import { assignCategory, createCategory } from "@/services/category";
import { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";

export default function AddCategory({ value, fetchAll, setAllCategories }) {
  const { cookies } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleRegisterCategory = async () => {
    setLoading(true);
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
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div
      onClick={!loading && handleRegisterCategory}
      className={[
        "w-full flex flex-row justify-between items-center bg-white my-1 p-6 border border-blue-500 cursor-pointer",
      ]}
    >
      {loading ? (
        <div className="w-full flex item-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <p>Adicionar - {value}</p>
          <AiFillPlusCircle size={25} color="rgb(59 130 246)" />
        </>
      )}
    </div>
  );
}
