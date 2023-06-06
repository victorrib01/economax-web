"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import SelectComponent from "@/components/Select";
import api from "@/services/api";
import { convertToCents } from "@/utils/formatters/convertToCents";
import { useAuth } from "@/contexts/auth";
import { getUserCategories } from "@/services/category";

export default function RegisterForm({ getLast5Records }) {
  const { cookies } = useAuth();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState(null);

  const [value, setValue] = useState("");
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState("");

  const formatValue = (value) => {
    const sanitizedValue = value.replace(/[^0-9]/g, "");
    const floatValue = parseFloat(sanitizedValue) / 100;
    return floatValue.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const formatted = formatValue(inputValue);
    setValue(formatted);
    // setFormattedValue(formatted);
  };

  async function handleRegister() {
    if (!convertToCents(value) || !category?.value)
      return alert("Preencha todos os campos!");
    try {
      setLoading(true);
      const response = await api.post("/cadastro_gastos_usuario", {
        id_usuario: cookies.id,
        usuario: cookies.user,
        gastos: [
          {
            id_categoria: category.value,
            valor: `${convertToCents(value)}`,
            descricao: description,
          },
        ],
      });
      if (response.data.message === "Gastos inseridos com sucesso!") {
        alert("Gasto inserido com sucesso!");
        setValue("");
        setCategory("");
        setDescription("");
        setTimeout(() => getLast5Records(), 200);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("handleRegister", error);
    }
  }
  async function getCategories() {
    setLoading(true);
    try {
      await getUserCategories(setOptions, cookies.id, true);
      setLoading(false);
      return Promise.resolve();
    } catch (err) {
      console.error(err);
      setLoading(false);
      return Promise.reject(err);
    }
  }

  useEffect(() => {
    if (cookies) getCategories();
  }, [cookies]);

  return (
    <div className="flex flex-col items-center justify-between h-full py-1">
      <Input
        placeholder={"valor"}
        type="tel"
        pattern="[0-9]*"
        onChange={handleInputChange}
        value={value}
      />
      <SelectComponent
        id={"category-select"}
        // isLoading={loading}
        // isDisabled={loading}
        options={options}
        onChange={setCategory}
        defaultValue={category}
        placeholder={"Selecione a categoria"}
      />
      <Input
        placeholder={"descrição"}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button title={"cadastrar"} onClick={handleRegister} disable={loading} />
    </div>
  );
}
