"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import Container from "@/components/Container";
// import { getLoginCookie } from "@/utils/cookies/loginCookie";

export default function SignUp() {
  const router = useRouter();
  const signUp = async () => {
    // const cook = await getLoginCookie();
    // console.log(cook);
  };
  return (
    <Container>
      <Image src="/Logo.svg" width={500} height={500} alt="Logo" priority />
      <div className="w-full flex flex-col justify-between min-h-[225px]">
        <Input name="username" placeholder="Username" />
        <Input name="password" type="password" placeholder="Password" />
        <Input
          name="repeat password"
          type="password"
          placeholder="Repeat Password"
        />
      </div>
      <div className="w-full flex flex-col justify-between min-h-[150px]">
        <Button title="Sign Up" onClick={signUp} />
        <Button title="Back" onClick={() => router.push("/")} outline />
      </div>
    </Container>
  );
}
