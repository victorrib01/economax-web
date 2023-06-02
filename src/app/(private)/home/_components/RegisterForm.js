"use client";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import SelectComponent from "@/components/Select";
import { useState } from "react";

export default function RegisterForm() {
  const [category, setCategory] = useState(null);
  const options = [
    { value: "1", label: "categoria 1" },
    { value: "2", label: "categoria 2" },
    { value: "3", label: "categoria 3" },
  ];
  return (
    <div className="flex flex-col items-center justify-between h-full py-1">
      <Input placeholder={"valor"} />
      <SelectComponent
        options={options}
        onChange={setCategory}
        defaultValue={category}
        placeholder={"Selecione a categoria"}
      />
      <Input placeholder={"descrição"} />
      <Button title={"cadastrar"} />
    </div>
  );
}
