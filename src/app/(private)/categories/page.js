import { cookies } from "next/headers";
import CategoriesContent from "./_components/CategoriesContent";

export default function CategoriesPage() {
  const nextCookies = cookies();

  const loginCookie = nextCookies.get("login");
  return <CategoriesContent loginCookie={loginCookie} />;
}
