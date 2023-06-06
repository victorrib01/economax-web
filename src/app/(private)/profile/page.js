import { cookies } from "next/headers";
import ProfileContent from "./_components/ProfileContent";

export default function ProfilePage() {
  const nextCookies = cookies();

  const loginCookie = nextCookies.get("login");
  return (
    <>
      <ProfileContent loginCookie={loginCookie} />
    </>
  );
}
