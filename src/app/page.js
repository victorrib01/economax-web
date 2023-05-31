import Image from "next/image";

import Container from "@/components/Container";
import { LoginForm } from "./components/LoginForm";
import { cookies } from "next/headers";

export default async function LoginPage() {
  const nextCookies = cookies();

  const loginCookie = nextCookies.get("login");

  return (
    <Container>
      <Image src="/Logo.svg" width={500} height={500} alt="Logo" priority />
      <LoginForm loginCookie={loginCookie} />
      <p>v{process.env.VERSION}</p>
    </Container>
  );
}
