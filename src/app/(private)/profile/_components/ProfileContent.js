"use client";
import { Button } from "@/components/Button";
import { clearLoginCookie } from "@/utils/cookies/loginCookie";
import { useRouter } from "next/navigation";

export default function ProfileContent() {
  const router = useRouter();

  function signOut() {
    clearLoginCookie();
    router.push("/");
  }
  return (
    <div className="flex flex-col h-full p-8 items-center justify-between">
      <p>ID: 1</p>
      <p>usuario: teste</p>
      <Button title={"Sair"} onClick={() => signOut()} />
      <p>v{process.env.VERSION}</p>
    </div>
  );
}
