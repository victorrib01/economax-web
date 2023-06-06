import { cookies } from "next/headers";
import SpendsByCategoryContent from "./_components/SpendsByCategoryContent";

export default function SpendsByCategoryPage() {
  const nextCookies = cookies();

  const loginCookie = nextCookies.get("login");
  const loginCookieParse = JSON.parse(loginCookie?.value || null);
  return <SpendsByCategoryContent loginCookie={loginCookieParse} />;
}
