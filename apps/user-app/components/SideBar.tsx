import React, { useState } from "react";

export type navType = "home" | "transfer" | "transactions";

const SideBar = ({ setNav, nav }: { setNav: (nav: navType) => void , nav: navType}) => {
 
  return (
    <div className="flex flex-col gap-2 border-r border-zinc-200 px-2 py-1 h-screen">
      <div className="mt-6 mx-2 ">
        <div
          className={`px-2 py-1 cursor-pointer hover:text-purple-500 ${nav === "home" ? "text-purple-500": null}`}
          onClick={() => {
            setNav("home");
          }}
        >
          Home
        </div>
        <div
          className={`px-2 py-1 cursor-pointer hover:text-purple-500 ${nav === "transfer" ? "text-purple-500": null}`}
          onClick={() => {
            setNav("transfer");
          }}
        >
          Transfer
        </div>
        <div
          className={`px-2 py-1 cursor-pointer hover:text-purple-500 ${nav === "transactions" ? "text-purple-500": null}`}
          onClick={() => {
            setNav("transactions");
          }}
        >
          Transactions
        </div>
      </div>
    </div>
  );
};

export default SideBar;
