import { cookies } from "next/headers";
import RegistryContent from "./_components/RegistryContent";

export default function RegistryPage() {
  const nextCookies = cookies();

  const loginCookie = nextCookies.get("login");
  const loginCookieParse = JSON.parse(loginCookie?.value || null);
  return (
    <>
      <RegistryContent loginCookie={loginCookieParse} />
    </>
  );
}
