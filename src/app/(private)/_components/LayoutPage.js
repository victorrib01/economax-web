"use client";
import BackButton from "@/components/BackButton";
import Menu from "./Menu";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import AuthProvider from "@/contexts/auth";
import Loader from "@/components/Loader";
import { ChangeTab } from "@/components/ChangeTab";
import UserProvider from "@/contexts/user";

export default function LayoutPage({ loginCookie, children }) {
  const router = useRouter();
  const pathname = usePathname();

  const renderChangeTab =
    pathname.split("/")[1] === "categories" ||
    pathname.split("/")[1] === "home";

  const backButtonActive = pathname.split("/").length > 2;

  const registerServiceWorker = () => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("Service Worker registrado com sucesso:", registration);
          })
          .catch((error) => {
            console.log("Falha ao registrar o Service Worker:", error);
          });
      });
    }
  };

  useEffect(() => {
    const token = loginCookie?.jwt; // Obtenha o token do cookie ou de outro local
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

  useEffect(() => {
    registerServiceWorker();
    console.log("rodei");
  }, []);
  useEffect(() => {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    // We listen to the resize event
    window.addEventListener("resize", () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);

      console.log(document.documentElement.style.getPropertyValue("--vh"));
    });
  }, []);
  return (
    <AuthProvider loginCookie={loginCookie}>
      <UserProvider>
        <div className="flex items-center justify-center max-w-full">
          <main
            className=" w-full max-w-[512px] bg-slate-100"
            style={{
              // height:
              //   "100vh" /* Use vh as a fallback for browsers that do not support Custom Properties */,
              height: "calc(var(--vh, 1vh) * 100)",
            }}
          >
            <div className="flex flex-col items-center justify-between h-full">
              <div
                className={
                  // renderChangeTab ||
                  backButtonActive
                    ? "h-[5%] w-full flex items-center justify-center"
                    : "hidden"
                }
              >
                {/* {renderChangeTab && <ChangeTab />} */}
                {backButtonActive && <BackButton />}
              </div>
              <div className={"h-[85%] w-full overflow-y-hidden p-4"}>
                {loginCookie?.jwt ? children : <Loader />}
              </div>
              <div className="h-[10%] w-full">
                <Menu />
              </div>
            </div>
          </main>
        </div>
      </UserProvider>
    </AuthProvider>
  );
}
