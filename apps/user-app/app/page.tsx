"use client"

// import { prisma } from "../../../packages/db/src/index"
import { prisma } from "@repo/db/prismaConfig";
import AppBar from "@repo/ui/appbar";
import { SessionProvider, useSession } from "next-auth/react";

export default function Page() {
  const session = useSession()
  return (
    <>
      <AppBar session={session}/>
      <div>{JSON.stringify(session)}</div>
    </>
  );
}
