import { cookies } from "next/headers";
import LayoutPage from "./_components/LayoutPage";

export const metadata = {
  title: "Economax Web",
  description: "Financial app",
};

export default function PrivateLayout({ children }) {
  const nextCookies = cookies();

  const loginCookie = nextCookies.get("login");
  const loginCookieParse = JSON.parse(loginCookie?.value || null);

  return <LayoutPage loginCookie={loginCookieParse}>{children}</LayoutPage>;
}
