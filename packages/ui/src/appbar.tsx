
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

export default function AppBar({session}: any) {
  console.log(session)
  return (
    <>
      <div className="flex justify-between items-center px-2 py-2 border-b">
        <div>PayTm</div>
        <div className="border rounded px-2 py-1 text-white text-sm bg-black cursor-pointer" onClick={() => {if(session.status === "authenticated") signOut(); signIn()}}>{session.status == "authenticated"? "Logout" : "Login"}</div>
      </div>
    </>
  );
}
