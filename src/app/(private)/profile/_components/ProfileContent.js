"use client";
import { Button } from "@/components/Button";
import { useAuth } from "@/contexts/auth";
import { clearLoginCookie } from "@/utils/cookies/loginCookie";
import { useRouter } from "next/navigation";

export default function ProfileContent() {
  const router = useRouter();
  const { cookies } = useAuth();

  function signOut() {
    clearLoginCookie();
    router.push("/");
  }
  return (
    <div className="flex flex-col h-full p-8 items-center justify-between">
      <p>ID: {cookies.id}</p>
      <p>usuario: {cookies.user}</p>
      <Button title={"Sair"} onClick={() => signOut()} />
      <p>v{process.env.VERSION}</p>
    </div>
  );
}
