"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import Container from "@/components/Container";
import api from "@/services/api";
import { setLoginCookie } from "@/utils/cookies/loginCookie";

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    user: "",
    password: "",
    repassword: "",
  });

  async function signUp() {
    setLoading(true);
    try {
      if (
        form.user === "" ||
        form.password === "" ||
        form.repassword.length < 3
      )
        return alert("Senhas invalida", "A senhas é invalida, tente novamente");
      if (form.password !== form.repassword)
        return alert(
          "Senhas diferentes",
          "A senhas não coincidem, tente novamente"
        );

      const response = await api.post("/cadastro", {
        usuario: form.user,
        senha: form.password,
      });

      if (response.data["Message"] === "Usuário cadastrado com sucesso!") {
        setLoginCookie({ user: form.user, id: response.data["id"] });
        alert("Cadastrado com sucesso, redirecionando para a home");
        setTimeout(() => router.push("/home"), 200);
      } else {
        alert(response.data["Message"], "Tenta novamente");
      }
    } catch (err) {
      console.error("handleRegister", err);
    }
    setLoading(false);
  }

  return (
    <Container>
      <Image src="/Logo.svg" width={500} height={500} alt="Logo" priority />
      <div className="w-full flex flex-col justify-between min-h-[225px]">
        <Input
          name="username"
          placeholder="Username"
          value={form.user}
          onChange={(e) =>
            setForm((prevState) => ({ ...prevState, user: e.target.value }))
          }
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm((prevState) => ({ ...prevState, password: e.target.value }))
          }
        />
        <Input
          name="repeat password"
          type="password"
          placeholder="Repeat Password"
          value={form.repassword}
          onChange={(e) =>
            setForm((prevState) => ({
              ...prevState,
              repassword: e.target.value,
            }))
          }
        />
      </div>
      <div className="w-full flex flex-col justify-between min-h-[150px]">
        <Button title="Sign Up" onClick={signUp} disable={loading} />
        <Button title="Back" onClick={() => router.push("/")} outline />
      </div>
    </Container>
  );
}
