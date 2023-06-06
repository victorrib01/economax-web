import { cookies } from "next/headers";
import HomeContent from "./_components/HomeContent";

export default function HomePage() {
  const nextCookies = cookies();

  const loginCookie = nextCookies.get("login");
  const loginCookieParse = JSON.parse(loginCookie?.value || null);

  return <HomeContent loginCookie={loginCookieParse} />;
}
