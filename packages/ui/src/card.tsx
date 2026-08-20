import React from "react";

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border border-zinc-200 bg-white rounded-md p-4">
      {children}
    </div>
  );
};

export default Card;
