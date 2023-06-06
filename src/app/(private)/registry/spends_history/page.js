import { cookies } from "next/headers";
import SpendsHistoryContent from "./_components/SpendsHistoryContent";

export default function SpendsHistoryPage() {
  const nextCookies = cookies();

  const loginCookie = nextCookies.get("login");
  const loginCookieParse = JSON.parse(loginCookie?.value || null);
  return <SpendsHistoryContent loginCookie={loginCookieParse} />;
}
