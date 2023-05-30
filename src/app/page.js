"use client";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import Image from "next/image";
import { useState } from "react";

const initialState = {
  user: "",
  password: "",
};

export default function Home() {
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    const { placeholder, value } = e.target;
    if (placeholder === "senha") {
      setForm((prevState) => ({ ...prevState, password: value }));
    } else {
      setForm((prevState) => ({ ...prevState, user: value }));
    }
  };

  const goToRegister = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode executar a lógica para enviar o formulário ou fazer outras ações com os valores do formulário
    console.log(form);
    setForm(initialState);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="min-h-screen min-w-[512px] bg-slate-50">
        <div className="flex flex-col min-h-screen items-center justify-between p-8">
          <Image
            src="Logo.svg"
            width={500}
            height={500}
            alt="Picture of the author"
            priority
          />
          <div className="w-full flex flex-col justify-between min-h-[150px]">
            <Input
              key={"user"}
              placeholder="usuário"
              value={form.user}
              onChange={handleChange}
            />
            <Input
              placeholder={"senha"}
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col justify-between min-h-[150px]">
            <Button title={"entrar"} onClick={handleSubmit} />
            <Button title={"cadastrar"} onClick={goToRegister} outline />
          </div>
          <p>v{process.env.VERSION}</p>
        </div>
      </div>
    </main>
  );
}
