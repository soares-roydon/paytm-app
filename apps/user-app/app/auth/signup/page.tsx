"use client";

import { prisma } from "@repo/db/prismaConfig";
import Button from "@repo/ui/button";
import InputBox from "@repo/ui/input";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Signin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup() {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data.error);
        return;
      }

      await signIn("credentials", {
        email,
        password,
        callbackUrl: "http://13.51.233.156:3005/",
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col gap-3 border border-zinc-400 rounded-md w-96 px-6 py-8">
          <InputBox
            type="text"
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <InputBox
            type="email"
            placeholder="mailbox@domain.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <InputBox
            type="text"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button onClick={handleSignup}>Sign up</Button>
        </div>
      </div>
    </>
  );
}
