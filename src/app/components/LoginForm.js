"use client";
import { useEffect, useState } from "react";
const initialState = {
  username: "",
  password: "",
};
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useRouter } from "next/navigation";
import { setLoginCookie } from "@/utils/cookies/loginCookie";
import { login } from "@/services/auth";

export function LoginForm({ loginCookie }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    const { placeholder, value } = e.target;
    if (placeholder === "Password") {
      setForm((prevState) => ({ ...prevState, password: value }));
    } else {
      setForm((prevState) => ({
        ...prevState,
        username: value.toLowerCase().trim(),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login({
        username: form.username,
        password: form.password,
      });

      const res = response.data;

      if (res["Message"] == "Usuário autenticado com sucesso!") {
        setLoginCookie({
          user: form.username,
          jwt: res.jwt,
        });
      } else {
        alert(res["Message"]);
      }
      router.refresh();
    } catch (error) {
      console.error(error);
    }

    setForm(initialState);
    setLoading(false);
  };

  useEffect(() => {
    const token = loginCookie?.jwt; // Obtenha o token do cookie ou de outro local
    if (token) {
      router.push("/home"); // Redirecione para a página de login
    }
  }, [loginCookie, router]);

  return (
    <>
      <div className="w-full flex flex-col justify-between min-h-[150px]">
        <Input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
      </div>
      <div className="w-full flex flex-col justify-between min-h-[150px]">
        <Button title="Login" onClick={handleSubmit} disable={loading} />
        <Button
          title="Sign up"
          onClick={() => router.push("/signup")}
          outline
        />
      </div>
    </>
  );
}
