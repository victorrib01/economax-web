"use client";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import SelectComponent from "@/components/Select";
import api from "@/services/api";
import { convertToCents } from "@/utils/formatters/convertToCents";
import { useEffect, useState } from "react";

export default function RegisterForm({ loginCookie, getLast5Records }) {
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
    console.log(formatted);
    // setFormattedValue(formatted);
  };

  async function handleRegister() {
    if (!convertToCents(value) || !category?.value)
      return alert("Preencha todos os campos!");
    try {
      setLoading(true);
      const response = await api.post("/cadastro_gastos_usuario", {
        id_usuario: loginCookie.id,
        usuario: loginCookie.user,
        gastos: [
          {
            id_categoria: category.value,
            valor: `${convertToCents(value)}`,
            descricao: description,
          },
        ],
      });
      if (response.data.message === "Gastos inseridos com sucesso!") {
        getLast5Records();
        alert("Gasto inserido com sucesso!");
        setValue("");
        setCategory("");
        setDescription("");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("handleRegister", error);
    }
  }

  async function getUserCategories() {
    try {
      const response = await api.post(
        "/busca_categorias_despesas_geral_usuario",
        {
          id_usuario: loginCookie.id,
        }
      );
      const formatted = response.data.map((item) => {
        return {
          label: item.categoria,
          value: item.id,
        };
      });
      setOptions(formatted);
      return Promise.resolve();
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  }

  useEffect(() => {
    getUserCategories();
  }, []);

  return (
    <div className="flex flex-col items-center justify-between h-full py-1">
      <Input
        placeholder={"valor"}
        onChange={(e) => handleInputChange(e)}
        value={value}
      />
      <SelectComponent
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
