import BackButton from "@/components/BackButton";
import Menu from "./_components/Menu";
import { cookies } from "next/headers";

export const metadata = {
  title: "Economax Web",
  description: "Financial app",
};

export default function PrivateLayout({ children }) {
  const nextCookies = cookies();

  const loginCookie = nextCookies.get("login");
  return (
    <div className="flex items-center justify-center max-w-full">
      <main className="min-h-screen h-screen w-full max-w-[512px] p-8 bg-slate-100">
        <div className="flex flex-col items-center justify-between h-full">
          <BackButton />
          <div className="h-[92%] w-full overflow-y-hidden">{children}</div>
          <Menu loginCookie={loginCookie} />
        </div>
      </main>
    </div>
  );
}
