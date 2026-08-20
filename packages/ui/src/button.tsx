import React from "react";

const Button = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <div
      className="flex justify-center items-center bg-black text-white rounded-md text-sm py-1.5 px-2 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Button;
