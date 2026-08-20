import Card from "@repo/ui/card";
import React from "react";
import { useState, useEffect } from "react";

const RecentTransactionsCard = () => {
  const [onRamp, setOnRamp] = useState([
    {
      provider: "",
      status: "",
      amount: 0,
      startTime: "",
      id: "",
    },
  ]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/on-ramp-transactions`).then(
      async (response) => {
        const onRampTransactions = await response.json();
        setOnRamp(onRampTransactions);
      },
    );
  }, []);
  return (
    <Card>
      <div>
        <div className="font-bold text-lg mb-2">Recent Transactions</div>
      </div>
      <div className="">
        {onRamp.map((item) => (
          <div
            className="flex justify-between border-b border-zinc-200 py-1.5 px-2"
            key={item.id}
          >
            <div>{item.provider}</div>
            <div>${item.amount / 100}</div>
            <div>{item.status}</div>
            <div>{item.startTime}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentTransactionsCard;
