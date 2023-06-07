"use client";
import BackButton from "@/components/BackButton";
import Menu from "./Menu";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthProvider from "@/contexts/auth";
import Loader from "@/components/Loader";

export default function LayoutPage({ loginCookie, children }) {
  const router = useRouter();

  useEffect(() => {
    const token = loginCookie?.id; // Obtenha o token do cookie ou de outro local
    if (!token) {
      router.push("/"); // Redirecione para a página de login
    } else {
      try {
        // setCookies(loginCookie);
        //   const decodedToken = verifyToken(token);
        // Se necessário, realize mais verificações no token (por exemplo, verifique a expiração)
      } catch (error) {
        router.push("/"); // Redirecione para a página de login se o token for inválido
      }
    }
  }, [loginCookie, router]);

  return (
    <AuthProvider loginCookie={loginCookie}>
      <div className="flex items-center justify-center max-w-full">
        <main className="min-h-screen h-screen w-full max-w-[512px] p-8 bg-slate-100">
          <div className="flex flex-col items-center justify-between h-full">
            <BackButton />
            <div className="h-[92%] w-full overflow-y-hidden">
              {loginCookie?.id ? children : <Loader />}
            </div>
            <Menu />
          </div>
        </main>
      </div>
    </AuthProvider>
  );
}
