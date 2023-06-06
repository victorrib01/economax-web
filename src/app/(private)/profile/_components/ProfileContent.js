"use client";
import { Button } from "@/components/Button";
import { clearLoginCookie } from "@/utils/cookies/loginCookie";
import { useRouter } from "next/navigation";

export default function ProfileContent({ loginCookie }) {
  const router = useRouter();
  const loginCookieParse = JSON.parse(loginCookie?.value || null);
  function signOut() {
    clearLoginCookie();
    router.push("/");
  }
  return (
    <div className="flex flex-col h-full p-8 items-center justify-between">
      <p>ID: {loginCookieParse.id}</p>
      <p>usuario: {loginCookieParse.user}</p>
      <Button title={"Sair"} onClick={() => signOut()} />
      <p>v{process.env.VERSION}</p>
    </div>
  );
}
