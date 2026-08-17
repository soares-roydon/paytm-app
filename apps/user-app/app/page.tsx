"use client";

import AppBar from "@repo/ui/appbar";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import Home from "../components/Home";
import SideBar, { navType } from "../components/SideBar";
import { useState } from "react";
import MainPage from "../components/MainPage";

export default function Page() {
  const [nav, setNav] = useState<navType>("home");
  const session = useSession();

  return (
    <>
      <AppBar session={session} />
      {session.data?.user ? (
        <div className="grid grid-cols-14 bg-amber-50">
          <div className="col-span-2">
            <SideBar setNav={setNav} nav={nav} />
          </div>
          <div className="col-span-12 px-2 py-2">
            <MainPage nav={nav} />
          </div>
        </div>
      ) : null}
    </>
  );
}
