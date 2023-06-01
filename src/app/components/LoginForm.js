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

export function LoginForm({ loginCookie }) {
  const router = useRouter();

  const loginCookieParse = JSON.parse(loginCookie?.value || null);

  const [form, setForm] = useState(initialState);
  const handleChange = (e) => {
    const { placeholder, value } = e.target;
    console.log(placeholder, value);
    if (placeholder === "Password") {
      setForm((prevState) => ({ ...prevState, password: value }));
    } else {
      setForm((prevState) => ({ ...prevState, username: value }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoginCookie(form);
      router.refresh();
    } catch (error) {
      console.log(error);
    }

    setForm(initialState);
  };

  useEffect(() => {
    if (loginCookieParse) {
      router.push("/home");
    }
  }, [loginCookieParse, router]);
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
        <Button title="Login" onClick={handleSubmit} />
        <Button
          title="Sign up"
          onClick={() => router.push("/signup")}
          outline
        />
      </div>
    </>
  );
}
