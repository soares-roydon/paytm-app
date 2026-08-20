import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Button from "./button";

export default function AppBar({ session }: any) {
  console.log(session);
  return (
    <>
      <div className="flex justify-between items-center px-2 py-2 border-b border-zinc-300">
        <div>PayTm</div>
        <Button
          onClick={() => {
            if (session.status === "authenticated") signOut();
            signIn();
          }}
        >
          {session.status == "authenticated" ? "Logout" : "Login"}
        </Button>
      </div>
    </>
  );
}
